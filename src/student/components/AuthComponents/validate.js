import * as API from '../../constants/Api';
import axios from 'axios';

export const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = 'Введіть e-mail'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Введіть коректний e-mail'
    }
    /* if (!values.sendEmailLetter) {
        errors.sendEmailLetter = 'Введіть e-mail'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.sendEmailLetter)) {
        errors.sendEmailLetter = 'Введіть коректний e-mail'
    }*/
    if (!values.password) {
        errors.password = 'Введіть пароль'
    }
    if (!values.name) {
        errors.name = "Введіть ім'я"
    }
    if (!values.position) {
        errors.position = "Введіть посаду"
    }
    if (!values.phone || values.phone.length === 0) {
        errors.phone = "Введіть телефон"
    }else if (values.phone.replace('+38 0', '').replace(/[^\d]/g, '').length < 9){

        errors.phone = "Помилка вводу"
    }

    if (!values.companyId || !values.companyId) {
        errors.companyId = "Оберіть компанію"
    }
    /*if (values.shopId === null || !values.shopId)  {
        errors.shopId = "Оберіть адресу магазину"
    }*/

    if (values.cityId === null || !values.cityId) {
        errors.cityId = "Оберіть місто"
    }
    if (!values.street) {
        errors.street = "Введіть вулицю"
    }
    if (!values.building) {
        errors.building = "Введіть номер будинку"
    }
    if (!values.streetType || !values.streetType) {
        errors.streetType = "Оберіть тип вулиці"
    }
    if (!values.samsungPlusLogin) {
        errors.samsungPlusLogin = "Введіть аккаунт Samsung+"
    }

    /*if (!values.shopName || !values.shopName) {
        errors.shopName = "Оберіть магазин"
    }*/
    /*if (!values.categoryProduct || !values.categoryProduct) {
        errors.categoryProduct = "Оберіть категорія продукту"
    }*/
    if (!values.modelProduct || !values.modelProduct) {
        errors.modelProduct = "Оберіть модель продукту"
    }
    if (!values.codeProduct) {
        errors.codeProduct = 'Введіть IMEI код товару'
    }






    /*if(!values.firstDoc){


        errors.secondDoc = 'Завантажте ІНН'
    }

    if(values.firstDoc){
        if(values.firstDoc.length == 0){
            errors.firstDoc = 'Завантажте ІНН'
        }

    }

    if(!values.secondDoc){
        errors.secondDoc = 'Завантажте cкан паспорта (1 сторінка)'
    }

    if(values.secondDoc){
        if(values.secondDoc.length == 0){
            errors.secondDoc = 'Завантажте cкан паспорта (1 сторінка)'
        }

    }


    if(!values.thirdDoc){
        errors.thirdDoc = 'Завантажте гарантійний талон'
    }

    if(values.thirdDoc){
        if(values.thirdDoc.length == 0){
            errors.thirdDoc = 'Завантажте гарантійний талон'
        }

    }

    if(!values.fourthDoc){
        errors.fourthDoc = 'Завантажте скан паспорта (2 сторінка)'
    }
    if(values.fourthDoc){
        if(values.fourthDoc.length == 0){
            errors.fourthDoc = 'Завантажте скан паспорта (2 сторінка)'
        }
    }


    if(!values.fifthDoc){
        errors.fifthDoc = 'Завантажте чек'
    }
    if(values.fifthDoc){
        if(values.fifthDoc.length == 0){
            errors.fifthDoc = 'Завантажте чек'
        }

    }



    if(!values.sixthDoc){
        errors.sixthDoc = 'Завантажте скан паспорта (3 сторінка)'
    }
    if(values.sixthDoc){
            if(values.sixthDoc.length == 0){
                errors.sixthDoc = 'Завантажте скан паспорта (3 сторінка)'
            }

    }*/
    /*if (values.sixthScreenShot == undefined) {

        console.log("99999999", values.sixthScreenShot)
        errors.sixthScreenShot = 'Завантажте скан паспорта (3 сторінка)'
    }else{
        console.log("99999999",values,  values.sixthScreenShot)
    }*/

// TODO : add validation fields


    if (!values.repeatPassword) {
        errors.repeatPassword = 'Підтвердіть пароль'
    }else if( values.repeatPassword !== values.password) {
        errors.repeatPassword = 'Паролі не співпадають'
    }



    return errors
};
export const asyncValidate = ({email}/*, dispatch */) => {

    return    axios.post(API.IS_EMAIL_AVAILABLE, {
        email
    })
        .then(({data}) => {
            if (!data.isAvailable) {
                throw { email: 'That email is taken' }
            }
        })
};
export const normalizePhoneForGhost = (value) => {
    return value.replace(/[^\d]/g, '')
    /*const getNums = (str) => str.replace(/[^\d]/g, '');
    let num = getNums(value);
    if(value){
    }
    return result*/
}
export const normalizeImeiCode = (value) => {
    //console.log(value.replace(/[^\d]/g, '').slice(0,15))
    return value.replace(/[^\d]/g, '').slice(0,15)
    /*const getNums = (str) => str.replace(/[^\d]/g, '');
     let num = getNums(value);
     if(value){
     }
     return result*/
}
export const normalizePhone = (value, previousValue) => {
    const startPrefix = '+38 0';
    const space = ' ';
    const defis = '-';
    const getNums = (str) => str.replace(startPrefix,'').replace(/[^\d]/g, '');
    const getOther = (str) => str.replace(startPrefix,'').replace(/[\d]/g, '');


    if((previousValue && value) && previousValue.length > value.length){
        //typing backwards
        if(getOther(previousValue) !== getOther(value)){
            for(let charIndex in previousValue){
                if(value[charIndex] !== previousValue[charIndex]) {

                    value = value.substring(0, charIndex - 1) + value.substring(charIndex + 1, value.length );

                }
            }
        }
    }
    let num = getNums(value);
    // if(num.length == 0){
    //     return startPrefix;
    // }


    
    


    const operator = num.slice(0,2);
    const chunk1 = num.slice(2,5);
    const chunk2 = num.slice(5,7);
    const chunk3 = num.slice(7,9);


    let result = '';

    if(value){
        if(operator.length > 0){
            result = `${startPrefix}${operator}`;
            if(operator.length == 2){
                result+=space
            }
        }
        if(chunk1){
            result+=chunk1;
            if(chunk1.length == 3){
                result+=defis;
            }
        }
        if(chunk2){
            result+=chunk2;
            if(chunk2.length == 2){
                result+=defis;
            }
        }
        if(chunk3){
            result+=chunk3;
        }
    }


    return result
}
