import { test, expect } from '@playwright/test';

const BASE_URL = 'https://dev.emeli.in.ua/wp-json/wp/v2';
const POSTS_ENDPOINT = `${BASE_URL}/posts`;

const AUTH = {
  username: 'admin',
  password: 'Engineer_123'
};

const getAuthHeaders = () => {
  // Спосіб 1: Якщо Buffer доступний
  // const base64 = Buffer.from(`${AUTH.username}:${AUTH.password}`).toString('base64');

  // Спосіб 2: Альтернативно можна використати btoa (але перевірте доступність)
  const base64 = btoa(`${AUTH.username}:${AUTH.password}`);

  return {
    'Authorization': `Basic ${base64}`,
    'Content-Type': 'application/json'
  };
};

test.describe('WordPress Posts API - CRUD Tests', () => {
  let createdPostId: number | null = null;

  test('CREATE - Should create a new post', async ({ request }) => {
    const postData = {
      title: 'Test Post from Playwright',
      content: 'This is test content created via API automation',
      status: 'publish',
      excerpt: 'Test excerpt'
    };

    const response = await request.post(POSTS_ENDPOINT, {
      headers: getAuthHeaders(),
      data: postData
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    createdPostId = responseBody.id;

    expect(responseBody).toHaveProperty('id');

    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    expect(responseBody.date).toMatch(isoRegex);

    const urlRegex = /^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i;
    expect(responseBody.link).toMatch(urlRegex);
    expect(typeof responseBody.name).toBe('string');
    expect(typeof responseBody.age).toBe('number');
    expect(typeof responseBody.isActive).toBe('boolean');

    expect(responseBody.content.protected).toBe(false);
    expect(Array.isArray(responseBody.tags)).toBe(true);
    expect(responseBody.tags).toHaveLength(0);
    expect(responseBody.categories).toEqual([1]);

    const classes = responseBody['class-list'];
    expect(classes).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/^post-\d+$/),
        'type',
      ])
    );

    expect(responseBody.title.rendered).toBe(postData.title);
    expect(responseBody.status).toBe('publish');

    console.log('Created post ID:', createdPostId);
  });

  test('READ - Should get all posts', async ({ request }) => {
    const response = await request.get(POSTS_ENDPOINT);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);

    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('content');
  });

  test('READ - Should get a specific post by ID', async ({ request }) => {
    const testPostId = createdPostId || 1;
    const response = await request.get(`${POSTS_ENDPOINT}/${testPostId}`);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post.id).toBe(testPostId);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
    expect(post).toHaveProperty('date');
  });

  test('UPDATE - Should update an existing post', async ({ request }) => {
    if (!createdPostId) {
      console.log('Skipping test: No post created to update');
      return;
    }

    const updateData = {
      title: 'Updated Test Post',
      content: 'This content has been updated via API'
    };

    const response = await request.put(`${POSTS_ENDPOINT}/${createdPostId}`, {
      headers: getAuthHeaders(),
      data: updateData
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const updatedPost = await response.json();
    expect(updatedPost.id).toBe(createdPostId);
    expect(updatedPost.title.rendered).toBe(updateData.title);
  });

  test('DELETE - Should delete a post and cleanup', async ({ request }) => {
    if (!createdPostId) {
      console.log('Skipping test: No post created to delete');
      return;
    }

    const response = await request.delete(`${POSTS_ENDPOINT}/${createdPostId}`, {
      headers: getAuthHeaders()
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Перевіряємо що пост дійсно видалено
    const getResponse = await request.get(`${POSTS_ENDPOINT}/${createdPostId}`);
    expect(getResponse.status()).toBe(404);

    // Скидаємо ID після видалення
    createdPostId = null;
  });

  test('Error Handling - Should handle non-existent post gracefully', async ({ request }) => {
    const response = await request.get(`${POSTS_ENDPOINT}/999999`);
    expect(response.status()).toBe(404);

    // Безпечно перевіряємо чи є JSON
    try {
      const errorBody = await response.json();
      if (errorBody && errorBody.code) {
        console.log('Error code:', errorBody.code);
      }
    } catch (e) {
      console.log('Response is not JSON or empty');
    }
  });
});

test.describe('WordPress Posts API - Performance Tests', () => {
  test('GET all posts - should respond within acceptable time', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(POSTS_ENDPOINT);
    const responseTime = Date.now() - startTime;

    expect(response.ok()).toBeTruthy();
    console.log(`Response time: ${responseTime}ms`);
    expect(responseTime).toBeLessThan(2000);
  });
});