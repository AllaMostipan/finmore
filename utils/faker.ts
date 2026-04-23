import { Faker, faker, uk } from '@faker-js/faker';
export const ukFaker = new Faker({ locale: [uk] });
 

export const currency = ['USD', 'UAH', 'EUR', 'GBP'];
 

export const generateUser = () => {
    const randomCurrency = faker.helpers.arrayElement(currency);
    const timestamp = Date.now();
    return {
        fullName: `${ukFaker.person.firstName()} ${ukFaker.person.lastName()}`,

        email: faker.internet.email({ 
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            provider: 'gmail.com'
        }),

        emailSimple: `user_${timestamp}@gmail.com`,

        password: faker.internet.password({ 
            length: 20, 
            memorable: true,
            pattern: /[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
        }),
        confirmPassword: '', 
        currency: randomCurrency
    };
};
 

export const generateUserWithConfirmation = () => {
    const userFake = generateUser();
    return {
        ...userFake,
        confirmPassword: userFake.password
    };
};