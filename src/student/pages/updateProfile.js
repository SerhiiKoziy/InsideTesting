import React, {Component, PropTypes} from 'react';

import {Field} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import cuid from 'cuid';
import {normalizePhone, normalizePhoneForGhost} from '../components/AuthComponents/validate';
import  {initialize, reset as resetForm, destroy} from 'redux-form';
import WizardStep from '../components/AuthComponents/WizardStep';
import Spinner from '../components/Spinner/Spinner';
import CheckBox from '../components/CheckBox/CheckBox';
import Button from '../components/Button/Button';
import  {renderTextField, renderDropdownList} from '../components/AuthComponents/Fields';
import {Link} from 'react-router';
const decorator = (f) => {
    var originalValue = '';

};


class updateProfile extends Component {
    static propTypes = {};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            page: this.props.location.query.showName ? 1 : 2,
            samsungPlusChecked: true,
            isCityNotInList: !!this.props.profile.data.cityOther,
            hasCompanyChecked: !!this.props.profile.data.companyOther,
            hasShopChecked: !!this.props.profile.data.shopOther,
            hasPositionChecked: false,
            activeName: false,
            submitAnimation: false,
            telephoneForGhost: false,

        };
    }

    componentDidMount() {
        this.props.actions.getStudentProfile();
        this.props.formActions.initialize('AuthWizard');
        //this.props.actions.getDictionaries()
    }

    nextPage(result) {
        console.log(result);
        this.props.actions.receiveProfile(this.normalizeValues(result));
        this.setState({page: this.state.page + 1});

    }

    previousPage() {
        this.setState({page: this.state.page - 1})
    }

    goTo(pageId) {
        this.setState({page: pageId});
    }

    normalizeValues(object, values = ['cityId', 'companyId', 'shopId', 'positionId']) {
        console.log(values)
        var obj = {
            ...object
        };
        for (let propName in obj) {
            console.log(propName);
            if (values.includes(propName)) {
                if (obj[propName] !== null && typeof obj[propName] === 'object' && !!obj[propName].id) {
                    obj[propName] = obj[propName].id;
                }
            }
        }
        return obj;
    }

    submitAnimation() {
        this.setState({submitAnimation: true})
        var self = this
        setTimeout(function () {
            self.setState({submitAnimation: false})
        }, 5000)
    }



    submitStep(result) {

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


        const step = this.props.profile.step;

        (step === "Name" && this.state.activeName == false) ? this.setState({activeName: true}) : this.setState({activeName: false});
        this.state.activeName == true ? this.setState({activeName: true}) : false

        this.setState({submitAnimation: true})
        var self = this;
        setTimeout(function () {
            self.setState({submitAnimation: false})
        }, 5000)
        //submitAnimation()

        //temp
        console.log('normalized', normalized, step);
        this.props.actions.setStudentProfile({
            ...normalized,
            lessonId: this.props.lessons.selectedLesson,
            step
        });


    }

    render() {


        const currentStep = this.props.profile.step;

        const {page} = this.state;
        const {shops, cities, companies, positions} = this.props.dic.data;


        const currentCompany = this.props.profile.data.companyId || 0;
        var currentAdress = companies[currentCompany].shops;
        const navList = new Array(8);

        const profile = this.props.profile;

        return (


            <div className="page registration-wr">
                {
                    this.state.activeName === true && (
                        <div className="header-name">
                            <span>{this.props.profile.data.name}</span>
                        </div>
                    )
                }

                {/*
                 <Spinner></Spinner>

                 */}

                {
                    (!this.props.profile.didInvalidate && !this.props.profile.isFetching  ) ?
                        (
                            <div className="form-wr">


                                {
                                    currentStep == 'Name' && (

                                        <WizardStep title="ІМ’Я ТА ПРІЗВІЩЕ" description="" onSubmit={::this.submitStep}
                                                    key="step1">
                                            <Field name="name" type="text" component={renderTextField}
                                                   placeholder="Ім'я та прізвище"/>
                                            <div
                                                className={`submit-text ${this.state.submitAnimation == true ? 'active' : 'inactive'}`}>
                                                Збережено! Очікуйте наступний крок.
                                            </div>
                                        </WizardStep>
                                    )
                                }
                                {
                                    currentStep == 'City' && (

                                        <WizardStep title="МІсто" description="" onSubmit={::this.submitStep}
                                                    key="step2">
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
                                            <div
                                                className={`submit-text ${this.state.submitAnimation == true ? 'active' : 'inactive'}`}>
                                                Збережено! Очікуйте наступний крок.
                                            </div>
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
                                        </WizardStep>


                                    )
                                }

                                {
                                    currentStep == 'Phone' && (

                                        <WizardStep title="номер телефону " description="" onSubmit={::this.submitStep}
                                                    key="step4">
                                            <div>
                                                {
                                                    this.state.telephoneForGhost == true &&(
                                                        <Field normalize={normalizePhoneForGhost} name="phone" type="text"
                                                               component={renderTextField}
                                                               placeholder="Телефон"/>
                                                    )
                                                }

                                                {
                                                    this.state.telephoneForGhost == false && (
                                                        <Field normalize={normalizePhone} name="phone" type="text"
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
                                                          label="Гість"
                                                          type="checkbox"
                                                />

                                            </div>





                                            {/* <Field name="phone"
                                                   placeholder="+38 (0__) ___ __ __"
                                                   normalize={normalizePhone}
                                                   type="text" component={renderTextField}/>*/}
                                            <div
                                                className={`submit-text ${this.state.submitAnimation == true ? 'active' : 'inactive'}`}>
                                                Збережено! Очікуйте наступний крок.
                                            </div>
                                        </WizardStep>
                                    )
                                }

                                {/*
                                    currentStep == 'Address' && (

                                        <WizardStep title="ваша адреса" description="" onSubmit={::this.submitStep}
                                                    key="step5">

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

                                                    <Field name="building" type="text" component={renderTextField}
                                                           placeholder="будинок"/>
                                                </div>
                                                <div className="right">
                                                    <Field name="buildingSection" type="text"
                                                           component={renderTextField} placeholder="корпус"/>
                                                    <Field name="appartment" type="text" component={renderTextField}
                                                           placeholder="номер квартири"/>
                                                </div>
                                            </div>
                                            <div
                                                className={`submit-text ${this.state.submitAnimation == true ? 'active' : 'inactive'}`}>
                                                Збережено! Очікуйте наступний крок.
                                            </div>
                                        </WizardStep>
                                    )
                                    */
                                }

                                {
                                    currentStep == 'Company' && (

                                        <WizardStep title="компанія" description="" onSubmit={::this.submitStep}
                                                    key="step6">
                                            {
                                                this.state.hasCompanyChecked == false && (
                                                    <Field
                                                        name="companyId"
                                                        component={renderDropdownList}
                                                        data={companies}
                                                        defaultValue={[]}
                                                        valueField="id"
                                                        textField="name"
                                                        placeholder="Оберіть компанію"
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
                                                          label="Необхідна компанія відсутня"
                                                          type="checkbox"

                                                />
                                            </div>
                                            <div
                                                className={`submit-text ${this.state.submitAnimation == true ? 'active' : 'inactive'}`}>
                                                Збережено! Очікуйте наступний крок.
                                            </div>
                                        </WizardStep>
                                    )
                                }
                                {
                                    currentStep == 'Shop' && (

                                        <WizardStep title="адреса магазину" description="" onSubmit={::this.submitStep}
                                                    key="step3">

                                            {
                                                (this.state.hasShopChecked == false && !this.state.hasCompanyChecked) && (
                                                    <Field
                                                        name="shopId"
                                                        component={renderDropdownList}
                                                        data={currentAdress}
                                                        valueField="id"
                                                        textField="name"
                                                        placeholder="Оберіть адресу магазину"
                                                        //{this.state.isCityNotInList == true && (`default`)}
                                                    />

                                                )
                                            }


                                            <div
                                                className={`submit-text ${this.state.submitAnimation == true ? 'active' : 'inactive'}`}>
                                                Збережено! Очікуйте наступний крок.
                                            </div>

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
                                                          label="Необхідна адреса відсутня"
                                                          type="checkbox"

                                                />
                                            </div>


                                        </WizardStep>
                                    )
                                }
                                {
                                    currentStep == 'Position' && (

                                        <WizardStep title="посада" description="" onSubmit={::this.submitStep}
                                                    key="step7">

                                            <Field
                                                name="positionId"
                                                component={renderDropdownList}
                                                data={positions}
                                                valueField="id"
                                                textField="text"
                                                placeholder="Оберіть позицію"/>



                                            <div
                                                className={`submit-text ${this.state.submitAnimation == true ? 'active' : 'inactive'}`}>
                                                Збережено! Очікуйте наступний крок.
                                            </div>
                                        </WizardStep>
                                    )
                                }
                                {
                                    currentStep == 'SamsungPlusLogin' && (

                                        <WizardStep title="Введіть email Samsung+" description=""
                                                    validFromProps={false}
                                                    onSubmit={::this.submitStep} key="step8">
                                            {
                                                this.state.samsungPlusChecked && (
                                                    <Field name="samsungPlusLogin" type="text"
                                                           component={renderTextField}
                                                           placeholder="samsungPlusEmail"/>
                                                )
                                            }
                                            <CheckBox name="samsungPlus"

                                                      value={this.state.samsungPlusChecked}
                                                      onChange={()=> {
                                                          this.setState({
                                                              samsungPlusChecked: !this.state.samsungPlusChecked
                                                          })
                                                      }}
                                                //defaultChecked
                                                      label="У мене немає аккаунт SAMSUNG+"
                                                      type="checkbox"

                                            />
                                            <div
                                                className={`submit-text ${this.state.submitAnimation == true ? 'active' : 'inactive'}`}>
                                                Збережено! Очікуйте наступний крок.
                                            </div>

                                        </WizardStep>
                                    )
                                }

                            </div>
                        ) :
                        (
                            <Spinner></Spinner>
                        )
                }


            </div>
        )
    }
}
function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        formActions: bindActionCreators({destroy, initialize}, dispatch),
    };
}
export default connect(state => state, mapDispatch)(updateProfile);