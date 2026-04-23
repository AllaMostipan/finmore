import { Locator, Page, expect } from "@playwright/test";


export async function clickElement(page: Page, testId: Locator, options = {}) {


  try {
    console.log(`[INFO] Спроба клікнути на елемент з testId: "${testId}"`);
    const element = page.getByTestId(testId);
    console.log(`[INFO] Перевірка видимості елемента: "${testId}"`);
    await expect(element).toBeVisible();
    console.log(`[SUCCESS] Елемент "${testId}" видимий`);
    console.log(`[INFO] Перевірка чи елемент активний: "${testId}"`);
    await expect(element).toBeEnabled();
    console.log(`[SUCCESS] Елемент "${testId}" активний`);
    console.log(`[INFO] Виконується клік по елементу: "${testId}"`);
    await element.click(options);
    console.log(`[SUCCESS] Клік по елементу "${testId}" успішно виконано`);
  } catch (error) {
    console.error(`[ERROR] Помилка при кліку на елемент "${testId}":`, error);
    console.error(`[ERROR] Деталі:`, error);
    throw error;
  }
};

export async function click(
  page: Page,
  selector: string | Locator,
  value: string,
  options: {
    timeout?: number;
    force?: boolean;
    strict?: boolean; // якщо false — не падати при помилках
    log?: boolean;
  } = {}
): Promise<void> {
  const {

    timeout = 5000,
    force = false,
    strict = false,
    log = true
  } = options; const locator =
    typeof selector === 'string' ? page.locator(selector) : selector;

  try {

    console.log(`[INFO] Перевірка видимості елемента: "${selector}"`);
    await locator.waitFor({ state: 'visible', timeout });

    if (!(await locator.isEnabled())) {
      console.log(`[INFO] Перевірка активності елемента: "${selector}"`);
      throw new Error(`Element is disabled: ${selector}`);
    }

    // 4) Заповнення
    console.log(`[SUCCESS] Клік по: "${selector}"`);
    await locator.click(value, { force });


  } catch (err) {
    if (log) {
      console.warn(`fill() warning for selector "${selector}":`, err);
    }

    if (strict) {
      throw err;
    }
  }

};

// export async function fillElement(page: Page, testId: string, value: string, options = {}) {
//   try {
//     console.log(`[INFO] Спроба заповнити елемент з testId: "${testId}" значенням: "${value}"`);
//     const element = page.getByTestId(testId);
//     console.log(`[INFO] Перевірка видимості елемента: "${testId}"`);
//     await expect(element).toBeVisible();
//     console.log(`[SUCCESS] Елемент "${testId}" видимий`);
//     console.log(`[INFO] Перевірка чи елемент активний: "${testId}"`);
//     await expect(element).toBeEnabled();
//     console.log(`[SUCCESS] Елемент "${testId}" активний`);
//     console.log(`[INFO] Виконується заповнення елемента: "${testId}" значенням "${value}"`);
//     await element.fill(value, options);
//     console.log(`[SUCCESS] Елемент "${testId}" успішно заповнено значенням "${value}"`);

//     const actualValue = await element.inputValue();
//     if (actualValue === value) {
//       console.log(`[SUCCESS] Верифікація: значення "${value}" правильно встановлено`);
//     } else {
//       console.warn(`[WARNING] Очікувалось значення "${value}", але отримано "${actualValue}"`);
//     }
//   } catch (error) {
//     console.error(`[ERROR] Помилка при заповненні елемента "${testId}":`, error);
//     console.error(`[ERROR] Деталі:`, error);
//     throw error;
//   }
// };

export async function fill(
  page: Page,
  selector: string | Locator,
  value: string,
  options: {
    clear?: boolean;
    timeout?: number;
    force?: boolean;
    strict?: boolean; // якщо false — не падати при помилках
    log?: boolean;
  } = {}
): Promise<void> {
  const {
    clear = true,
    timeout = 5000,
    force = false,
    strict = false,
    log = true
  } = options;

  const locator =
    typeof selector === 'string' ? page.locator(selector) : selector;

  try {

    console.log(`[INFO] Перевірка видимості елемента: "${selector}"`);
    await locator.waitFor({ state: 'visible', timeout });

    if (!(await locator.isEnabled())) {
      console.log(`[INFO] Перевірка активності елемента: "${selector}"`);
      throw new Error(`Element is disabled: ${selector}`);
    }


    if (clear) {
      console.log(`[INFO] Перевірка очищення елемента: "${selector}"`);
      await locator.fill('', { force });
    }

    // 4) Заповнення
    console.log(`[SUCCESS] Перевірка очищення елемента: "${selector}"`);
    await locator.fill(value, { force });

    // 5) Перевірка, що значення встановилось
    const currentValue = await locator.inputValue();
    if (currentValue !== value) {

      throw new Error(
        `Value mismatch. Expected "${value}", got "${currentValue}"`
      );
    }
  } catch (err) {
    if (log) {
      console.warn(`fill() warning for selector "${selector}":`, err);
    }

    if (strict) {
      throw err;
    }
  }
}



export async function selectOption(page: Page, testId: Locator, value: string, options = {}) {
  try {
    console.log(`[INFO] Спроба вибрати опцію в елементі з testId: "${testId}" значенням: "${value}"`);
    const element = page.getByTestId(testId);
    console.log(`[INFO] Перевірка видимості елемента: "${testId}"`);
    await expect(element).toBeVisible();
    console.log(`[SUCCESS] Елемент "${testId}" видимий`);
    console.log(`[INFO] Перевірка чи елемент активний: "${testId}"`);
    await expect(element).toBeEnabled();
    console.log(`[SUCCESS] Елемент "${testId}" активний`);
    console.log(`[INFO] Виконується вибір опції: "${value}"`);
    await element.selectOption(value, options);
    console.log(`[SUCCESS] Опція "${value}" успішно вибрана в елементі "${testId}"`);
  } catch (error) {
    console.error(`[ERROR] Помилка при виборі опції в елементі "${testId}":`, error);
    console.error(`[ERROR] Деталі:`, error);
    throw error;
  }
}



