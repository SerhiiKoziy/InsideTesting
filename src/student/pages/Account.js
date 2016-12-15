import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router'
import {Field} from 'redux-form';
import * as actions from '../actions';
import Button from '../components/Button/Button'
import CheckBox from '../components/CheckBox/CheckBox';

import  EditProfile from '../components/AuthComponents/EditProfile';
import  Spinner from '../components/Spinner/Spinner';
import  {renderTextField, renderDropdownList, renderDropdownListSaveChange} from '../components/AuthComponents/Fields';
import  {normalizePhone, normalizePhoneForGhost} from '../components/AuthComponents/validate';

class Account extends Component {
    constructor(props) {
        super(props);
        //this.store = this.props.store;

        this.state = {
            currentTab: 1,
            editorView: false,
            filedPage: 1,
            selectShop:{
                name: '',
                id:0,
                shops:[]
            },
            selectShopAdress: {},
            samsungPlusChecked:true,
            isCityNotInList: !!this.props.profile.data.cityOther,
            hasCompanyChecked: !!this.props.profile.data.companyOther,
            hasShopChecked: !!this.props.profile.data.shopOther,
            hasPositionChecked: false,
            listNote: true,
            currentNote: 0,
            openNote: false,
            telephoneForGhost: false,
        }

    };
    componentDidMount() {
        this.props.actions.getNews();
        this.props.actions.getNotes();

        this.props.actions.getScoreTotal();
        this.props.actions.getBoughtPresent();

        /*this.interval = setInterval(()=> {
            this.props.actions.getLessons();
        }, 10000);*/

        //this.props.actions.list();
    }
    componentWillMount() {
        //this.findObject()
    }

    getParam(array, id, fieldName = 'id') {
        return array.filter(function (obj) {
            return obj[fieldName] == id;
        })[0].name

    }
    getParamShopsAdress(arrayCompanies, companyId, shopId, fieldName = 'id') {
        console.log('companyId', companyId,'shopId', shopId)
        let arrShops = arrayCompanies.map(item => {
            if(item.id == companyId){
               // console.log(item)
                return item;
                /*item.shops.map(itemShop => {
                    if(itemShop.id == shopId){
                        return itemShop.name
                    }
                })*/

            }
        }).filter(item => !!item)[0]

        if(arrShops.shops.length > 0){
            let arr = arrShops.shops;
            let shopAdrs = arr.map(item => {
                if(item.id == shopId){
                    console.log("item",item)
                }
            }).filter(item => !!item)[0]

            //console.log(arrShops, arrShops.shops, 'shopAdrs', shopAdrs)
        }


    }

    normalizeValues(object, values = ['cityId', 'companyId', 'shopId', 'positionId']){
        var obj = {
            ...object
        };

        for (let key in obj){
            if(values.includes(key) && obj[key] !== null && typeof obj[key] === 'object' ){
                obj[key] = obj[key].id;
            }
        }
        console.log('objobjobjobjv', obj)
        return obj;
    }

    openNote(numNote) {
        this.setState({
            currentNote: numNote,

        })

    }
    submitEdit(result) {


        const normalized = this.normalizeValues(result);

        if (!this.state.isCityNotInList)
            normalized['cityOther'] = null;
        else
            normalized['cityId'] = null;

        if (!this.state.hasCompanyChecked)
            normalized['companyOther'] = null;
        else
            normalized['companyId'] = null;

        if (!this.state.hasShopChecked)
            normalized['shopOther'] = null;
        else
            normalized['shopId'] = null;

        if (!this.state.hasPositionChecked)
            normalized['positionOther'] = null;
        else
            normalized['positionId'] = null;


        console.log('normalized',normalized, ...normalized)
        this.props.actions.setStudentProfile({
            ...normalized
        });

        //console.log(result);

        this.setState({
            editorView: false
        });
    }
    showEditorView() {
        this.setState({
            editorView: true
        });
    }

    goToBuyPresent() {
        this.props.actions.pushRedirect(`/present`)
    }
    goToBuyRegistrationSale() {
        this.props.actions.pushRedirect(`/registrationSale`)
    }
    list() {
        const companyId = this.props.profile.data.companyId || 1;
        let companies = this.props.dic.data.companies;

        //var currentAdress = companies[companyId].shops;
       // return currentAdress


    }
    //filter companies for view (adress shops)
    filterCompanies(){

    }

    findObject(){
        const {companies} = this.props.dic.data;
        if( companies ){
            const cComp1 = companies.map( item => {
                for(var id in item){
                    if(item[id] == companyId){
                        console.log("12312312312", item, item[id], companyId, item.shops)
                        return item.shops
                    }
                }
            }).filter( item => !!item);
            console.log('cComp2 :', cComp1);
        }
    }


    render() {
        const scoreMain = this.props.scoreTotal.data;
        //   const {data:profileData} = this.props.profile;
        console.log('scoreMain', scoreMain)
        var self = this;
        const arrNews = this.props.news.data;
        const shopNameValue = this.state.selectShop.name;
        const arrNotes = this.props.notes.data;

        const { cities, companies, positions} = this.props.dic.data;
        const { account} = this.props;
        const {name, position, phone, companyId, companyOther, email, shopId, shopOther, shopsNew, cityId, cityOther, streetType, street, building, buildingSection, appartment, samsungPlusLogin} = this.props.profile.data;
        //const cComp = [];
        //console.log('cComp1 :', cComp);

        if(account.boughtPresent){
            console.log('00000')
        }
        if(companies){

                 const cComp1 = companies.map( item => {
                     for(var id in item){
                         if(item[id] == companyId){
                            //console.log("12312312312", item, item[id], companyId, item.shops)
                            return item.shops
                         }
                     }
                 }).filter( item => !!item);
                 //console.log('cComp2 :', cComp1);
        }

        return (
            <div className="account-page test page">
                <nav className="top-nav">

                    <Link to='/' onlyActiveOnIndex={true} activeClassName='active'>Головна</Link>
                    <Link to='/school' activeClassName='active'>smartschool</Link>
                    <Link to='/samsungLesson' activeClassName=''>samsung+</Link>
                    <Link to='/' activeClassName='active'>особистий кабінет</Link>

                </nav>


                            <div className="info-wr">
                            <h3>ваші дані</h3>

                            {
                                ((!this.props.dic.didInvalidate && !this.props.dic.isFetching ) &&
                                (!this.props.profile.didInvalidate && !this.props.profile.isFetching )) ?

                                    (    <div className="updata-form-wr">
                                        {
                                            !this.state.editorView && (
                                                <div className="info-block">

                                                    <p><b>{name}</b></p>

                                                    {position  && (
                                                        <p> {position}</p>
                                                    )
                                                    }

                                                    { (companyId || companyOther) && (
                                                        <p>

                                                            {companyId == null ? companyOther : this.getParam(companies, companyId)}

                                                        </p>
                                                    )
                                                    }

                                                    {(shopId || shopOther) &&(
                                                        <p>

                                                            {/*{shopNameValue||shopOther} this.getParamShopsAdress(companies, companyId, shopId)*/}
                                                            {/*<span>{shopId == null ? shopOther : this.getParamShopsAdress(companies, companyId, shopId)} </span>*/}

                                                            {/*shopId == null ? shopOther : this.getParam(companies[currentCompany].shops, shopId)*/}
                                                            {/*this.getParam(companies[currentCompany].shops, shopId)*/}
                                                        </p>
                                                    )
                                                    }

                                                    {cities && (cityId || cityOther)  && (
                                                        <p>
                                                            <span>{cityId == null ? cityOther : this.getParam(cities, cityId)} </span>
                                                            {/*<span>{streetType}</span>
                                                             <span>{street}</span>,
                                                             <span>{building}</span>,
                                                             <span>{appartment}</span>,
                                                             <span>{buildingSection}</span>*/}

                                                        </p>
                                                    )
                                                    }

                                                    {email && (
                                                        <p>{email}</p>
                                                    )
                                                    }
                                                    {phone && (
                                                        <p>{phone}</p>
                                                    )
                                                    }

                                                    {samsungPlusLogin && (
                                                        <div>
                                                            <h5><b>Логін в Samsung+</b></h5>
                                                            <p>{samsungPlusLogin}</p>
                                                        </div>
                                                    )

                                                    }


                                                    <Button type={'grey'} onClick={::this.showEditorView}>
                                                        редагувати дані
                                                    </Button>

                                                    <div className="buttons-wr">
                                                        <Button type={'main'} onClick={::this.goToBuyRegistrationSale}>
                                                            зареєструвати продаж
                                                        </Button>
                                                        <Button type={'main'} onClick={::this.goToBuyPresent}>
                                                            придбати подарунок
                                                        </Button>


                                                    </div>



                                                </div>


                                            )
                                        }

                                        {
                                            this.state.editorView && (
                                                <EditProfile title="Ваші дані"
                                                             description=""
                                                             onSubmit={::this.submitEdit}
                                                             autoComplete="off"
                                                             key="step1">

                                                    {this.state.filedPage == 1 && (
                                                        <div >
                                                            <Field name="name"
                                                                   type="text"
                                                                   component={renderTextField}
                                                                   placeholder="Ваше ім'я"/>

                                                            <Field
                                                                name="positionId"
                                                                component={renderDropdownList}
                                                                data={positions}
                                                                valueField="id"
                                                                textField="text"
                                                                placeholder="Оберіть позицію"/>


                                                            {/*  COMPANY   */}
                                                            {/*  <Field
                                                             name="companyId"
                                                             component={renderDropdownList}
                                                             data={companies}
                                                             defaultValue={[]}
                                                             valueField="id"
                                                             textField="name"
                                                             placeholder="Оберіть компанію"
                                                             />   */}


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

                                                                            placeholder="Оберіть компанію"/>
                                                                    )
                                                                }
                                                                <div className="box-select-city">
                                                                    <CheckBox name="samsungCompany"
                                                                              value={this.state.hasCompanyChecked}
                                                                              onChange={()=> {
                                                                                  this.setState({
                                                                                      hasCompanyChecked: !this.state.hasCompanyChecked
                                                                                  })
                                                                              }}
                                                                              answerId = "first"
                                                                              label="Необхідна компанія відсутня"
                                                                              type="checkbox"

                                                                    />
                                                                </div>
                                                            </div>



                                                            {/*  SHOP  */}
                                                            {/*  <Field
                                                             name="shopId"
                                                             component={renderDropdownList}
                                                             data= {this.state.selectShop.shops}

                                                             valueField="id"
                                                             textField="name"
                                                             placeholder="Оберіть адресу магазину"
                                                             //{this.state.isCityNotInList == true && (`default`)}
                                                             />  */}
                                                            <div>
                                                                {
                                                                    (this.state.hasShopChecked == false && !this.state.hasCompanyChecked) && (


                                                                        <Field
                                                                            name="companyName"
                                                                            component={renderDropdownListSaveChange}
                                                                            data={this.state.selectShop.shops}
                                                                            valueField="id"
                                                                            textField="name"
                                                                            placeholder="Оберіть адресу магазину"
                                                                            valueCurrent={this.state.selectShopAdress.shops}
                                                                            onChange={value => this.setState({selectShopAdress: value})}
                                                                            //onChange={::this.saveShop}
                                                                        />

                                                                    )
                                                                }


                                                                {
                                                                    !(this.state.hasShopChecked == false && !this.state.hasCompanyChecked) && (
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

                                                            {/*<div>
                                                             {

                                                             this.state.hasCityChecked == false &&(
                                                             <Field
                                                             name="shopId"
                                                             component={renderDropdownList}
                                                             data={shops}
                                                             valueField="id"
                                                             textField="name"
                                                             placeholder="Оберіть адресу магазину"
                                                             //{this.state.hasCityChecked == true && (`default`)}
                                                             />
                                                             )
                                                             }

                                                             {
                                                             this.state.hasCityChecked == true &&(
                                                             <Field name="shopId"
                                                             type="text"
                                                             valueField="id"
                                                             component={renderTextField}
                                                             placeholder="Адреса магазину"/>
                                                             )
                                                             }
                                                             <div className="box-select-city">
                                                             <CheckBox name="samsungCity"
                                                             value={this.state.hasCityChecked}
                                                             onChange={()=>{this.setState({
                                                             hasCityChecked: !this.state.hasCityChecked
                                                             })}}
                                                             label="Необхідна адреса відсутня"
                                                             type="checkbox"

                                                             />
                                                             </div>
                                                             </div>*/}





                                                            <Field name="email" type="text" component={renderTextField}
                                                                   placeholder="E-mail"/>


                                                            {/* phone */}
                                                            <div>
                                                                {
                                                                    this.state.telephoneForGhost == true &&(
                                                                        <Field normalize={normalizePhoneForGhost}
                                                                               name="phone"
                                                                               type="text"
                                                                               component={renderTextField}
                                                                               placeholder="Телефон"/>
                                                                    )
                                                                }

                                                                {
                                                                    this.state.telephoneForGhost == false && (
                                                                        <Field normalize={normalizePhone}
                                                                               name="phone"
                                                                               type="text"
                                                                               component={renderTextField}
                                                                               placeholder="Телефон"/>
                                                                    )
                                                                }

                                                                <CheckBox name="samsungCity"
                                                                          defaultChecked={this.state.telephoneForGhost}
                                                                          onChange={()=> {
                                                                              this.setState({
                                                                                  telephoneForGhost: !this.state.telephoneForGhost
                                                                              })
                                                                          }}
                                                                          answerId = "third"
                                                                          label="Гість"
                                                                          type="checkbox"
                                                                />

                                                            </div>


                                                            {/*  samsungCity */}
                                                            <div>
                                                                {
                                                                    this.state.isCityNotInList == false && (
                                                                        <Field
                                                                            name="cityId"
                                                                            component={renderDropdownList}
                                                                            data={cities}
                                                                            valueField="id"
                                                                            textField="name"
                                                                            placeholder="Оберіть місто"/>

                                                                    )
                                                                }
                                                                {
                                                                    this.state.isCityNotInList == true && (
                                                                        <Field
                                                                            name="cityOther"
                                                                            component={renderTextField}
                                                                            type="text"
                                                                            placeholder="Оберіть місто"/>
                                                                    )
                                                                }

                                                                <div className="box-select-city">
                                                                    <CheckBox name="samsungCity"
                                                                              defaultChecked={this.state.isCityNotInList}
                                                                              onChange={()=> {
                                                                                  this.setState({
                                                                                      isCityNotInList: !this.state.isCityNotInList,
                                                                                      hasShopChecked: !this.state.hasShopChecked
                                                                                  })
                                                                              }}
                                                                              answerId = "fourth"
                                                                              label="Необхідна адреса відсутня"
                                                                              type="checkbox"

                                                                    />
                                                                </div>
                                                            </div>

                                                            {
                                                                this.state.samsungPlusChecked == true && (
                                                                    <Field name="samsungPlusLogin" type="text" component={renderTextField}
                                                                           placeholder="samsungPlusEmail"/>
                                                                )
                                                            }

                                                            <CheckBox name="samsungPlus"
                                                                      answerId = "sumsung"
                                                                      value={this.state.samsungPlusChecked}

                                                                      onChange={()=>{this.setState({
                                                                          samsungPlusChecked: !this.state.samsungPlusChecked
                                                                      })}}
                                                                      defaultChecked={!this.state.samsungPlusChecked}
                                                                      label="У мене немає аккаунт SAMSUNG+"
                                                                      type="checkbox"

                                                            />



                                                            {/*<p  className="link-button" onClick={() => {
                                                                this.setState({filedPage: 1})
                                                            }}>
                                                                назад
                                                            </p>*/}

                                                            {/*<p  className="link-button" onClick={() => {
                                                                this.setState({filedPage: 2})
                                                            }}>
                                                                далі
                                                            </p>*/}



                                                        </div>
                                                    )
                                                    }
                                                    {/*this.state.filedPage == 2 && (
                                                        <div>

                                                            <div>
                                                                {
                                                                    this.state.isCityNotInList == false && (
                                                                        <Field
                                                                            name="cityId"
                                                                            component={renderDropdownList}
                                                                            data={cities}
                                                                            valueField="id"
                                                                            textField="name"
                                                                            placeholder="Оберіть місто"/>

                                                                    )
                                                                }
                                                                {
                                                                    this.state.isCityNotInList == true && (
                                                                        <Field
                                                                            name="cityOther"
                                                                            component={renderTextField}
                                                                            type="text"
                                                                            placeholder="Оберіть місто"/>
                                                                    )
                                                                }

                                                                <div className="box-select-city">
                                                                    <CheckBox name="samsungCity"
                                                                              defaultChecked={this.state.isCityNotInList}
                                                                              onChange={()=> {
                                                                                  this.setState({
                                                                                      isCityNotInList: !this.state.isCityNotInList,
                                                                                      hasShopChecked: !this.state.hasShopChecked
                                                                                  })
                                                                              }}
                                                                              label="Необхідна адреса відсутня"
                                                                              type="checkbox"

                                                                    />
                                                                </div>
                                                            </div>

                                                            {
                                                                this.state.samsungPlusChecked == true && (
                                                                    <Field name="samsungPlusLogin" type="text" component={renderTextField}
                                                                           placeholder="samsungPlusEmail"/>
                                                                )
                                                            }

                                                            <CheckBox name="samsungPlus"
                                                                      answerId = "sumsung"
                                                                      value={this.state.samsungPlusChecked}

                                                                      onChange={()=>{this.setState({
                                                                          samsungPlusChecked: !this.state.samsungPlusChecked
                                                                      })}}
                                                                      defaultChecked={!this.state.samsungPlusChecked}
                                                                      label="У мене немає аккаунт SAMSUNG+"
                                                                      type="checkbox"

                                                            />



                                                            <p  className="link-button" onClick={() => {
                                                                this.setState({filedPage: 1})
                                                            }}>
                                                                назад
                                                            </p>


                                                            {/* <div className="adress">
                                                             <div className="row first-row">
                                                             <div className="left">
                                                             <Field
                                                             name="streetType"
                                                             component={renderDropdownList}
                                                             placeholder="Оберіть тип вулиці"
                                                             data={[
                                                             'вул.',
                                                             'пр.'
                                                             ]}
                                                             defaultValue={'вул.'}
                                                             />
                                                             </div>
                                                             <div className="right">

                                                             <Field name="street" type="text" component={renderTextField}
                                                             placeholder="Назва вулиці..."/>
                                                             </div>

                                                             </div>
                                                             <div className="row">
                                                             <div className="left">

                                                             <Field name="building" type="text"
                                                             component={renderTextField} placeholder="будинок"/>
                                                             </div>
                                                             <div className="right">
                                                             <Field name="buildingSection" type="text"
                                                             component={renderTextField} placeholder="корпус"/>
                                                             <Field name="appartment" type="text"
                                                             component={renderTextField}
                                                             placeholder="номер квартири"/>
                                                             </div>
                                                             </div>
                                                             </div>*//*}
                                                        </div>
                                                    )*/
                                                    }


                                                </EditProfile>
                                            )
                                        }


                                    </div>) :
                                    ( <Spinner></Spinner>)
                            }


                        </div>

                            <div className="options-wr">

                                <div className="tabs-wr">

                                    {
                                        this.state.openNote === false && (
                                            <div className="tabs-header">
                                                <ul>
                                                    <li onClick={() => {
                                                        this.setState({currentTab: 1})
                                                    }}
                                                        className={` ${this.state.currentTab == 1 ? 'active' : ''}`}>
                                                        <p>мої новини</p>
                                                    </li>
                                                    <li onClick={() => {
                                                        this.setState({currentTab: 2})
                                                    }}
                                                        className={` ${this.state.currentTab == 2 ? 'active' : ''}`}>
                                                        <p>мої подарунки</p>
                                                    </li>
                                                    <li onClick={() => {
                                                        this.setState({currentTab: 3})
                                                    }}
                                                        className={` ${this.state.currentTab == 3 ? 'active' : ''}`}>
                                                        <p>результати</p>
                                                    </li>
                                                    <li onClick={() => {this.setState({currentTab: 4})}}
                                                        className={` ${this.state.currentTab == 4 ? 'active' : ''}`}>
                                                        <p>нотатки</p>
                                                    </li>
                                                </ul>
                                            </div>

                                        )

                                    }

                                    <div className="tabs-body">
                                        {
                                            this.state.currentTab === 1 && (
                                                <div>
                                                    {arrNews.map(function(news, qid ){

                                                        return(
                                                            <div key={news.id+'-'+qid} className="newArticle">
                                                                <h5>{news.title}</h5>

                                                                <p>{news.text}</p>
                                                            </div>
                                                        )
                                                    })}



                                                </div>
                                            )

                                        }
                                        {
                                            this.state.currentTab === 2 && (
                                                <div className="second-tab">
                                                    <div className="table-header">
                                                        <div className="">
                                                            <span>дата</span>
                                                        </div>
                                                        <div className="">
                                                            <span>найменування</span>
                                                        </div>
                                                        <div className="">
                                                            <span>кількість</span>
                                                        </div>
                                                        <div className="">
                                                            <span>вартість</span>
                                                        </div>
                                                    </div>

                                                    {account.boughtPresent.list.map(item =>{
                                                        return(
                                                            <div key={item.count} className="table-row">
                                                                <div className="productDate">
                                                                    <span>{item.date}</span>
                                                                </div>
                                                                <div className="productName">
                                                                    <p>
                                                                        <span>{item.name}</span>
                                                                    </p>
                                                                </div>
                                                                <div className="productCount">

                                                                    <span>x{item.count} шт.</span>
                                                                </div>
                                                                <div className="productPrice">
                                                                    <span>{item.price}</span>
                                                                </div>
                                                            </div>
                                                        )

                                                    })}




                                                    {/*<ul>
                                                        <li>
                                                            <a href=""></a>
                                                        </li>
                                                        <li>
                                                            <a href=""></a>
                                                        </li>
                                                        <li>
                                                            <a href=""></a>
                                                        </li>
                                                        <li>
                                                            <a href=""></a>
                                                        </li>
                                                        <li>
                                                            <a href=""></a>
                                                        </li>
                                                        <li>
                                                            <a href=""></a>
                                                        </li>
                                                    </ul>*/}
                                                </div>
                                            )

                                        }
                                        {
                                            this.state.currentTab === 3 && (
                                                <div className="third-tab">
                                                    <p><span>SMARTSCHOOL</span> <span>{scoreMain.testScore}</span></p>
                                                    <p><span>Samsung+</span> <span>{(scoreMain.samsungPlusScore == null)? 0 : scoreMain.samsungPlusScore}</span></p>
                                                    <p><span>Samsung++</span> <span>{(scoreMain.samsungPlusPlusScore == null)? 0 : scoreMain.samsungPlusPlusScore}</span></p>
                                                    <p><span>sales</span> <span>0</span></p>
                                                    <p><span>Подарунки</span> <span>{(scoreMain.prizesSpentScore == null)? 0 : (scoreMain.prizesSpentScore)}</span></p>
                                                    <p className="summResult"><span>Усього</span> <span>{scoreMain.scoreBalance}</span></p>
                                                </div>
                                            )

                                        }
                                        {
                                            this.state.currentTab === 4 && (
                                                <div className="fourth-tab">

                                                    {
                                                        this.state.listNote === true &&(
                                                            <div>

                                                                {arrNotes.map((note, i ) => {
                                                                    var numNote = i;
                                                                    return(
                                                                        <div key={numNote} className="newNote">

                                                                            <h4 onClick={() => {
                                                                                this.openNote(numNote)
                                                                                this.setState({listNote:false,openNote:true})
                                                                            }
                                                                            }>{note.title}</h4>
                                                                            <h5>{note.date}</h5>


                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>

                                                        )
                                                    }

                                                    {
                                                        this.state.listNote === false &&(
                                                            <div>
                                                                <div className="current-note">
                                                                    <div className="close-note" onClick={() => {
                                                                        this.setState({listNote:true, openNote:false})
                                                                    }}><span></span></div>

                                                                    <h4 className="">{arrNotes[this.state.currentNote].title}</h4>

                                                                    <h5>{arrNotes[this.state.currentNote].date}</h5>

                                                                    <p> {arrNotes[this.state.currentNote].text}</p>
                                                                    {/*
                                                                     arrNotes[this.state.currentNote].notes.map((note, i) => {
                                                                     return (
                                                                     <p key={i}>{note}</p>
                                                                     )
                                                                     })*/
                                                                    }


                                                                </div>

                                                                <div className="buttons-notes">
                                                                    <div className="prev-notes" onClick={() => {



                                                                        if(arrNotes[this.state.currentNote - 1] !== undefined){
                                                                            let prevNote = this.state.currentNote - 1;
                                                                            this.setState({currentNote: prevNote})
                                                                        }else{
                                                                            console.log("ERROR NOTE have't prev")
                                                                        }

                                                                    }}><span></span></div>
                                                                    <div className="next-notes"onClick={() => {

                                                                        if(arrNotes[this.state.currentNote + 1] !== undefined){
                                                                            let nextNote = this.state.currentNote + 1;
                                                                            this.setState({currentNote: nextNote})
                                                                        }else{
                                                                            console.log("ERROR NOTe have't next")
                                                                        }


                                                                    }}><span></span></div>
                                                                </div>
                                                            </div>

                                                        )

                                                    }




                                                </div>
                                            )

                                        }


                                    </div>
                                </div>


                            </div>


            </div>
        );
    }
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(state => state, mapDispatch)(Account);