import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

import {Field} from 'redux-form';
import Sale from '../Account/Sale';
import CheckBox from '../CheckBox/CheckBox';
import Button from '../Button/Button';
import  Spinner from '../Spinner/Spinner';
import  {renderTextField, renderDropdownList, renderDownloadFieldFirst, renderDropdownListSaveChange} from '../AuthComponents/Fields';
import  {normalizeImeiCode} from '../AuthComponents/validate';

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class RegistrationSaleForm extends Component {

    constructor(props) {
        super(props);

        this.state = {

            isCityNotInList: !!this.props.profile.data.cityOther,
            hasCompanyChecked: !!this.props.profile.data.companyOther,
            hasShopChecked: !!this.props.profile.data.shopOther,
            selectShop:{
                name: '',
                id:0,
                shops:[]
            },
            selectCategory:{
                id:0,
                name:'',
                products:[]
            },

            registSaleSend: 1,
            firstBs: 0,
            cityId:0,
            shopId:0,
            shopAdress:[],
            productCategories:0,
            productModel:[],

            docsScreenshots:{
                firstDoc:0,
                secondDoc:0,
                thirdDoc:0,
                fourthDoc:0,
                fifthDoc:0,
                sixthDoc:0,
            }
        }
    }
    componentDidMount(){

    }
    normalizeValues(object, values = ['cityId', 'companyId', 'shopId']){
        var obj = {
            ...object
        };
        for (let key in obj){
            if(values.includes(key) && obj[key] !== null && typeof obj[key] === 'object' ){
                obj[key] = obj[key].id;
            }
        }
        return obj;
    }
    submitLogin(result) {
        //  console.log(result);
        this.props.actions.login({
            ...result,
            lessonId: this.props.lessons.selectedLesson || null,

        },this.props.successRedirect);

    }
    sendClick(result) {
        let shopId
        let shopOther
        let companyOther
        let companyId
        if (this.state.hasShopChecked){
            shopId  = ""
            shopOther = result.shopOther
        }else{
            shopId  = result.shopId
            shopOther = ""
        }

        if (this.state.hasCompanyChecked){
            companyId  = ""
            companyOther  = result.companyOther
        }else{
            companyId = this.state.selectShop.id
            companyOther  = ""
        }




        var docsDocs = this.state.docsScreenshots;

        for(var key in result){
            for(var docBs64 in docsDocs)
                if(key == docBs64){
                    result[key] = docsDocs[docBs64]
                }
        }
        console.log('sendToApi :', result)


        if(this.props.account.isRegist.credentialsExist == false){
            this.props.actions.registrationSale({
                fullName:result.name,
                cityId: result.cityId.id,
                shopId: shopId,
                shopOther: shopOther,
                companyId: companyId,
                companyOther: companyOther,
                productId: result.modelProduct.id,
                imei: result.codeProduct,
                warrantyImage: result.thirdDoc,
                checkImage: result.fifthDoc,
                credentials: {
                    pinImage:result.firstDoc,
                    passportFirstImage:result.secondDoc,
                    passportSecondImage:result.fourthDoc,
                    passportThirdImage:result.sixthDoc
                }
            })

        }else{
            this.props.actions.registrationSale({
                fullName:result.name,
                cityId: result.cityId.id,
                shopId: shopId,
                shopOther: shopOther,
                companyId: companyId,
                companyOther: companyOther,
                productId: result.modelProduct.id,
                imei: result.codeProduct,
                warrantyImage: result.thirdDoc,
                checkImage: result.fifthDoc,
                credentials: {/*
                    pinImage:0,
                    passportFirstImage:0,
                    passportSecondImage:0,
                    passportThirdImage:0*/
                }
            })
        }


        this.setState({registSaleSend: 2})

    }

    submitRegister(result) {
        this.props.actions.register({
            ...result,
            lessonId: this.props.lessons.selectedLesson || null,
        }, this.props.successRedirect);
    }


    saveCity(data){
        if(data.id){
            this.setState({cityId:data.id})
            //console.log('2222222', data)
        }
        //console.log('llllllll', data)
    }
    saveShopAdress(){
        const {companies} = this.props.dic.data;

        const selectShop = this.state.selectShop.id;



        if(selectShop > 0){
            let shopAdresses = companies.map(item => {
                if(item.id == selectShop){
                    return item.shops;
                    console.log('item', item)
                }
            }).filter(item => !!item)[0]
            console.log('shopAdress', shopAdresses)
            this.setState({shopAdresses: shopAdresses})
        }
    }
    saveShop(data){
        if(data.id){
            this.setState({shopId:data.id})
            console.log('saveShop data', data)
        }
        console.log('saveShop data 2', data)
    }
    saveProductCategories(data){
        if(data.id){
            this.setState({productCategories:data.id, productModel:data.products})
           // console.log('productCategories data', data)
        }

    }
    saveProductModel(){/*
        const {productCategories} = this.props.dic.data;
        if(this.state.shopId > 0){
            var productModel = productCategories.map(item => {
                if(item.id == this.state.productCategories){
                    console.log('item.products', item.products)
                    return item.products;
                }
            }).filter(item => !!item)[0]
            this.setState({productModel: productModel})

            console.log('productModel', productModel)
        }*/
    }


    base() {
        document.getElementById("second-doc").addEventListener("change", readFile, false);
        function readFile() {
            if (this.files && this.files[0]) {


                var FR = new FileReader();
                FR.onload = function (e) {
                    return e.target.result;
                };
                FR.readAsDataURL(this.files[0]);
            }
        }

    }
    upFile(data) {
         var input = document.querySelector("#" + data + "[type=file]");
         var file = input.files[0];
         var reader = new FileReader();
         var self = this;

         reader.onloadend = function () {
             var obj = self.state.docsScreenshots;
             for (var key in obj){
                 if(key == data){
                     obj[key] = reader.result
                         //console.log( "sendToApi333:", reader.result);
                 }
             }
             self.setState({docsScreenshots:obj})
        }

        if (file) {
            reader.readAsDataURL(file);
        }
        var formdata = new FormData();
        formdata.append("file", file);
        //$('#type span').empty().append (file.type);
        if(file.name.length >= 30){
            $('label.' + data).text(file.name.substr(0,16) + '...');
        }else {
            $('label.' + data).text(file.name);
        }


}

    goToBuyRegistrationSale(){
        this.setState({registSaleSend: 1})
    }

    render() {
        const { cities, companies, productCategories} = this.props.dic.data;
        const {type:loginType, forgot, profile, dic:data, root} = this.props;
        const {name} = this.props.profile.data;
        const shopNameValue = this.state.selectShop.name;
        const selectCategoryValue = this.state.selectCategory.name
        const account =  this.props.account;
        const fetching =  this.props.account.isFetching;
        if(fetching == false){
            var isRegistOnce = account.isRegist.credentialsExist;


        }




        //document.getElementById("input-image").addEventListener("change", readFile, false);
        return (



            <div className="sale-form">


                {
                    (this.state.registSaleSend == 1 && account.isSendedSale == true) && (
                        <Sale title="зареєструвати продаж"
                              description="Lorem ipsum dolor sit amet adipiscing"
                              onSubmit={::this.sendClick}
                              autoComplete="off"
                              buttonText="зареєструвати"
                              key="step1">

                            <div className="form-wr">
                                <div className="left-form">
                                    {/*<p className="namePerson">
                                        <span>{profile.data.name}</span>
                                    </p>*/}

                                    <Field
                                        name="name"
                                        type="text"
                                        valueCurrent={this.state.name}
                                        component={renderTextField}
                                        placeholder="Ім'я"
                                        //onChange={value => this.setState({selectShop: value})}
                                    />

                                    <Field
                                        name="cityId"
                                        component={renderDropdownList}
                                        data={cities}
                                        valueField="id"
                                        textField="name"
                                        placeholder="Місто"
                                        onClick={::this.saveCity}
                                    />




                                    {/*  SHOP NAME */}



                                        {/*<Field
                                        name="shopName"
                                        component={renderDropdownListSaveChange}
                                        data={companies}
                                        valueField="id"
                                        textField="name"
                                        placeholder="Магазин"
                                        valueCurrent={shopNameValue}
                                        onChange={value => this.setState({selectShop: value})}
                                        //onChange={::this.saveShop}
                                    />*/}
                                    <div>
                                        {
                                            this.state.hasCompanyChecked == false && (
                                                <Field
                                                    name="companyName"
                                                    component={renderDropdownListSaveChange}
                                                    data={companies}
                                                    valueField="id"
                                                    textField="name"
                                                    placeholder="Оберіть назву магазину"
                                                    valueCurrent={shopNameValue}
                                                    onChange={value => this.setState({selectShop: value})}
                                                    //onChange={::this.saveShop}
                                                />
                                            )
                                        }


                                        {
                                            this.state.hasCompanyChecked == true && (
                                                <Field
                                                    name="companyOther"
                                                    component={renderTextField}
                                                    valueField="id"
                                                    type="text"
                                                    textField="name"
                                                    placeholder="Назву магазину"/>
                                            )
                                        }
                                        <div className="box-select-city">
                                            <CheckBox name="samsungCity"
                                                      defaultChecked={this.state.hasCompanyChecked}
                                                //value={this.state.hasShopChecked}
                                                      onChange={()=> {
                                                          this.setState({
                                                              hasCompanyChecked: !this.state.hasCompanyChecked,
                                                              hasShopChecked: !this.state.hasShopChecked
                                                          })
                                                      }}
                                                      answerId = "first"
                                                      label="Необхідна назва компанії відсутня"
                                                      type="checkbox"

                                            />
                                        </div>
                                    </div>




                                    {/*  SHOP ADRESS */}



                                    {/*<Field
                                     name="shopId"
                                     component={renderDropdownList}
                                     data={this.state.selectShop.shops}
                                     valueField="id"
                                     textField="name"
                                     placeholder="Адреса магазину"
                                     onClick={::this.saveShopAdress}
                                     />*/}

                                    <div>
                                        {
                                            (this.state.hasShopChecked == false && !this.state.hasCompanyChecked) && (
                                                <Field
                                                    name="shopId"
                                                    component={renderDropdownList}
                                                    data= {this.state.selectShop.shops}

                                                    valueField="id"
                                                    textField="name"
                                                    placeholder="Оберіть адресу магазину"
                                                    onClick={::this.saveShopAdress}
                                                />

                                            )
                                        }


                                        {
                                            !(this.state.hasShopChecked == false && !this.state.hasCompanyChecked)&& (
                                                <Field
                                                    name="shopOther"
                                                    component={renderTextField}
                                                    valueField="id"
                                                    type="text"
                                                    textField="name"
                                                    placeholder="Адреса магазину"/>
                                            )
                                        }
                                        <div className="box-select-city">
                                            <CheckBox name="samsungCity"
                                                      defaultChecked={this.state.hasShopChecked}
                                                      //value={this.state.hasShopChecked}
                                                      onChange={()=> {
                                                          this.setState({
                                                              hasShopChecked: !this.state.hasShopChecked
                                                          })
                                                      }}
                                                      answerId = "sec"
                                                      label="Необхідна адреса відсутня"
                                                      type="checkbox"

                                            />
                                        </div>
                                    </div>



                                    <Field
                                        name="categoryProduct"
                                        component={renderDropdownListSaveChange}
                                        data={productCategories}
                                        valueField="id"
                                        textField="name"
                                        placeholder="Категорія"
                                        valueCurrent={selectCategoryValue}
                                        onChange={value => this.setState({selectCategory: value})}
                                    />
                                    <Field
                                        name="modelProduct"
                                        component={renderDropdownList}
                                        data={this.state.selectCategory.products}
                                        valueField="id"
                                        textField="name"
                                        placeholder="Модель"
                                        onClick={::this.saveProductModel}
                                    />



                                    <Field
                                        normalize={normalizeImeiCode}
                                        name="codeProduct"
                                        type="text"
                                        id="sendEmail"
                                        component={renderTextField}
                                        placeholder="IMEI код товару"/>


                                </div>
                                <div className="right-form">
                                    {
                                        (fetching == false && isRegistOnce == false) && (
                                                <Field name="firstDoc"
                                                       type="file"
                                                       id="firstDoc"
                                                       className="firstDoc"
                                                       onChange={this.upFile.bind(this, "firstDoc")}
                                                       component={renderDownloadFieldFirst}
                                                       accept="image/jpeg,image/JPG,image/png,image/PNG,image/gif"
                                                       placeholder="Завантажити ІНН"

                                                />
                                        )
                                    }
                                    {
                                        (fetching == false && isRegistOnce == false) && (
                                                <Field name="secondDoc"
                                                       type="file"
                                                       id="secondDoc"
                                                       className="secondDoc"
                                                       onChange={this.upFile.bind(this, "secondDoc")}
                                                       accept="image/jpeg,image/JPG,image/png,image/PNG,image/gif"
                                                       component={renderDownloadFieldFirst}
                                                       placeholder="Скан паспорта (1 сторінка)"/>

                                        )
                                    }

                                                <Field name="thirdDoc"
                                                       type="file"
                                                       id="thirdDoc"
                                                       className="thirdDoc"
                                                       onChange={this.upFile.bind(this, "thirdDoc")}
                                                       accept="image/jpeg,image/JPG,image/png,image/PNG,image/gif"
                                                       component={renderDownloadFieldFirst}
                                                       placeholder="Завантажити гарантійний талон"/>

                                    {
                                        (fetching == false && isRegistOnce == false) && (
                                                <Field name="fourthDoc"
                                                       type="file"
                                                       id="fourthDoc"
                                                       className="fourthDoc"
                                                       onChange={this.upFile.bind(this, "fourthDoc")}
                                                       accept="image/jpeg,image/JPG,image/png,image/PNG,image/gif"
                                                       component={renderDownloadFieldFirst}
                                                       placeholder="Скан паспорта (2 сторінка)"/>
                                        )
                                    }


                                            <Field name="fifthDoc"
                                               type="file"
                                               id="fifthDoc"
                                               className="fifthDoc"
                                               onChange={this.upFile.bind(this, "fifthDoc")}
                                               accept="image/jpeg,image/JPG,image/png,image/PNG,image/gif"
                                               component={renderDownloadFieldFirst}
                                               placeholder="Завантажити чек"/>

                                    {
                                        (fetching == false && isRegistOnce == false) && (
                                            <Field name="sixthDoc"
                                               type="file"
                                               id="sixthDoc"
                                               className="sixthDoc"
                                               onChange={this.upFile.bind(this, "sixthDoc")}
                                               accept="image/jpeg,image/JPG,image/png,image/PNG,image/gif"
                                               component={renderDownloadFieldFirst}
                                               placeholder="Скан паспорта (3 сторінка)"/>
                                        )
                                    }

                                    </div>


                            </div>

                        </Sale>
                    )
                }


                {
                    (this.state.registSaleSend == 2 && account.isSendedSale == true && account.sendRegistrationSale == true) && (
                        <div className="successMessage">
                            <h3>Дякуємо!<br/>
                                Реєстрація вашого продажу на модерації.  </h3>

                            <Button type={'white'} onClick={::this.goToBuyRegistrationSale}>
                                продовжити
                            </Button>
                        </div>

                    )
                }
                {
                    (this.state.registSaleSend == 2 && account.isSendedSale == true && account.sendRegistrationSale == false) && (
                        <div className="successMessage">
                            <h3>упс! Щось пішло не так. Спробуйте знову.</h3>

                            <Button type={'white'} onClick={::this.goToBuyRegistrationSale}>
                                продовжити
                            </Button>
                        </div>

                    )
                }
                {
                    (this.state.registSaleSend == 2 && account.isSendedSale == true && account.sendRegistrationSale == "imeiFalse"  ) && (
                        <div className="successMessage">
                            <h3>упс! Введений Вами код товару не зареєстрований в базі.<br/>
                                Спробуйте знову.
                            </h3>

                            <Button type={'white'} onClick={::this.goToBuyRegistrationSale}>
                                продовжити
                            </Button>
                        </div>

                    )
                }
                {
                    (this.state.registSaleSend == 2 && account.isSendedSale == false )&&(
                        <Spinner></Spinner>
                    )
                }





            </div>

        )
    }
}