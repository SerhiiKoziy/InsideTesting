import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';


import {Field} from 'redux-form';
import Login from '../AuthComponents/Login';
import Register from '../AuthComponents/Register';
import Button from '../Button/Button';
import CheckBox from '../CheckBox/CheckBox';
import  {renderTextField, renderDropdownList,renderDropdownListSaveChange} from '../AuthComponents/Fields';
import  {normalizePhone, normalizePhoneForGhost} from '../AuthComponents/validate';


const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};
@connect(mapStateToProps, mapDispatchToProps)
export default class AuthForm extends Component {
    static propTypes = {

        onRegister:PropTypes.func,
        onLogin:PropTypes.func,
        successRedirect:PropTypes.string

    };
    static defaultProps = {
        onRegister: ()=> {
        },
        onLogin: ()=> {
        },
        successRedirect:null
    };

    constructor(props) {
        super(props);
        this.state = {
            regPage:1,
            telephoneForGhost: false,
            isCityNotInList: !!this.props.profile.data.cityOther,
            hasCompanyChecked: !!this.props.profile.data.companyOther,
            hasShopChecked: !!this.props.profile.data.shopOther,
            samsungPlusChecked:true,
            selectShop:{
                name: '',
                id:0,
                shops:[]
            },
        }
    }

    submitLogin(result) {
          console.log('result', result, this.props.successRedirect);
        this.props.actions.login({
            ...result,
            lessonId: this.props.lessons.selectedLesson || null,


        },this.props.successRedirect);


    }

    nextStepReg(){
        this.state.regPage == 1 ? this.setState({regPage:2}) : this.setState({regPage:1})

    }

    submitRegister(result) {
        console.log(result)
        this.props.actions.register({

            ...result,
            lessonId: this.props.lessons.selectedLesson || null,

        }, this.props.successRedirect);
    }

    render() {
        const {type:loginType, forgot, root} = this.props;
        const {user} = this.props;
        const { cities, companies} = this.props.dic.data;
        const shopNameValue = this.state.selectShop.name;


        return (

            <div className={`first-step ${forgot === true ? "blur-form": "" }`} >
                {
                    loginType == 'login' && (
                            <Login title="вхід"
                                   description=""
                                   onSubmit={::this.submitLogin}
                                   autoComplete="off"
                                   buttonText="Вхід"
                                   key="step1">

                                <Field name="email" type="text" component={renderTextField} placeholder="E-mail"/>



                                <Field name="password" type="password" component={renderTextField}
                                       placeholder="Пароль"/>

                                <p className="forgot-pass" onClick={this.props.onRestoreOn}>Забули пароль?</p>

                                {
                                    !!user.errorLogin && (

                                        <div className="error-holder">
                                            {user.errorLogin}
                                        </div>
                                    )
                                }


                            </Login>

                    )
                }
                    {
                        loginType == 'register' && (

                            <Register title="Реєстрація"
                                      description=""
                                      buttonText="Зареєструватися"
                                      customFormName="registerForm"
                                      onSubmit={::this.submitRegister}
                                      key="step2">


                                      <div className="">
                                            <Field name="name" type="text" component={renderTextField} placeholder="Имя"/>

                                            <Field name="email" type="text" component={renderTextField}
                                                   placeholder="E-mail"/>
                                            <Field name="password" type="password" component={renderTextField}
                                                   placeholder="Пароль"/>
                                            <Field name="repeatPassword" type="password" component={renderTextField}
                                                   placeholder="Підтвердити пароль"/>
                                      </div>

                                    {
                                        !!user.errorRegister && (

                                            <div className="error-holder">
                                                {user.errorRegister}
                                            </div>
                                        )
                                    }


                            </Register>
                        )
                    }
                {
                    loginType == 'registerIndexPage' && (

                        <Register title="Реєстрація"
                                  description=""
                                  buttonText="Зареєструватися"
                                  customFormName="registerForm"
                                  onSubmit={::this.submitRegister}
                                  key="step2">


                            <div className={`form-wr ${this.state.regPage == 1 ? 'opened' : ''}`}>
                                <Field name="name" type="text" component={renderTextField} placeholder="Имя"/>

                                <Field name="email" type="text" component={renderTextField}
                                       placeholder="E-mail"/>
                                <Field name="password" type="password" component={renderTextField}
                                       placeholder="Пароль"/>
                                <Field name="repeatPassword" type="password" component={renderTextField}
                                       placeholder="Підтвердити пароль"/>
                            </div>
                            <div className={`form-wr ${this.state.regPage == 2 ? 'opened' : ''}`}>
                                <Field name="position"
                                       type="text"
                                       component={renderTextField}
                                       placeholder="Посада"/>
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
                                <div>
                                    {
                                        (this.state.hasShopChecked == false && !this.state.hasCompanyChecked) && (
                                            <Field
                                                name="shopId"
                                                component={renderDropdownList}
                                                data= {this.state.selectShop.shops}

                                                //data={cComp}
                                                valueField="id"
                                                textField="name"
                                                placeholder="Оберіть адресу магазину"
                                                //{this.state.isCityNotInList == true && (`default`)}
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

                            </div>


                            {
                                this.state.regPage == 1 ? (
                                    <Button type={'white'} onClick={::this.nextStepReg}>
                                        далі
                                    </Button>
                                ):(
                                    <Button type={'white'} onClick={::this.nextStepReg}>
                                        назад
                                    </Button>
                                )
                            }


                            {
                                !!user.errorRegister && (

                                    <div className="error-holder">
                                        {user.errorRegister}
                                    </div>
                                )
                            }


                        </Register>
                    )
                }



                <div className="btn-wr col switcher">
                    {
                        loginType == 'login' ? (

                            <Button className="btn btn--fw btn--white"
                                    onClick={this.props.onRegister}>
                                Зареєструватися
                            </Button>
                        ) : (
                            <Button className="btn btn--fw btn--white"
                                    onClick={this.props.onLogin}>
                                Вхід
                            </Button>
                        )
                    }


                </div>


            </div>

        )
    }
}