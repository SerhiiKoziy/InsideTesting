const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = 'Введите e-mail'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Неправильный e-mail'
    }
    if (!values.password) {
        errors.password = 'Введите пароль'
    };

    if (!values.repeatPassword) {
        errors.repeatPassword = 'Подтвердите пароль'
    }else if( values.repeatPassword !== values.password) {
        errors.repeatPassword = 'Пароли не совпадают'
    }
    const requiredFields = [ 'firstName', 'lastName', 'middleName','addressShop','position','phone','companyId','shopId',
        'cityId'];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required ' + field;
        }
    });


    return errors
}

export default validate