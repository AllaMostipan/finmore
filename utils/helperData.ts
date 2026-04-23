export const firstnames = [
    'Іван',
    'Олена',
    'Тарас',
    'Марія',
    'Андрій',
    'Наталія',
    'Олександр',
    'Юлія'
];

export const lastnames = [
    'Кравчук',
    'Коваль',
    'Шевченко',
    'Іваненко',
    'Мельник',
    'Бондар',
    'Ткаченко',
    'Кравченко'
];

export const currency =[
    'USD',
    'UAH',
    'EUR',
    'GBP'
]


 
export const generateUser = () => {
    const randomIndex =Math.floor(Math.random()*currency.length);
    const randomFirstNameIndex = Math.floor(Math.random() * firstnames.length);
    const randomLastNameIndex = Math.floor(Math.random() * lastnames.length)
    
    const timestamp = Date.now();
 
    return {
        fullName: `${firstnames[randomFirstNameIndex]} ${lastnames[randomLastNameIndex]}`, // нормальне ім'я
        email: `user_${timestamp}@gmail.com`,
        password: 'NewPass123',
        confirmPassword : 'NewPass123',
        currency: currency[randomIndex]
    };
};