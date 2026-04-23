import { Locator, Page, expect } from "@playwright/test";



export async function click(
  page: Page,
  selector: string | Locator,
  options: {
    timeout?: number;
    force?: boolean;
    strict?: boolean; // якщо true — падати при помилках
    log?: boolean;
  } = {}
): Promise<void> {
  const {
    timeout = 5000,
    force = false,
    strict = false,
    log = true,
  } = options;

  const locator =
    typeof selector === 'string' ? page.locator(selector) : selector;

  try {
    if (log) {
      console.log(`[INFO] Очікування видимості елемента: "${selector}"`);
    }
    await locator.waitFor({ state: 'visible', timeout });

    const enabled = await locator.isEnabled();
    if (!enabled) {
      if (log) {
        console.log(`[WARN] Елемент неактивний: "${selector}"`);
      }
      throw new Error(`Element is disabled: ${selector}`);
    }

    if (log) {
      console.log(`[SUCCESS] Клік по елементу: "${selector}"`);
    }
    await locator.click({ force });
  } catch (err) {
    if (log) {
      console.warn(`click() warning for selector "${selector}":`, err);
    }
    if (strict) {
      throw err;
    }
  }
};


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
};

export async function selectOption(
  page: Page,
  selector: string | Locator,
  values: string | string[],
  options: {
    timeout?: number;
    strict?: boolean; // якщо true — падати при помилках
    log?: boolean;
  } = {}
): Promise<void> {
  const {
    timeout = 5000,
    strict = false,
    log = true,
  } = options;

  const locator =
    typeof selector === 'string' ? page.locator(selector) : selector;

  try {
    if (log) {
      console.log(`[INFO] Очікування видимості select: "${selector}"`);
    }
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();

    if (log) {
      console.log(`[SUCCESS] Вибір опції "${values}" у: "${selector}"`);
    }
    await locator.selectOption(values);
  } catch (err) {
    if (log) {
      console.warn(`selectOption() warning for selector "${selector}":`, err);
    }
    if (strict) {
      throw err;
    }
  }
}







