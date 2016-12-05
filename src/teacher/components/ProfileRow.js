import React, {Component, PropTypes} from 'react';

import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';

import { TableRow, TableRowColumn} from 'material-ui/Table';

const green = {
    color: 'green'
};
const red = {
    color: 'red'
};
const buttonStyle ={
    margin: '0px 2px'
}

const CheckIcon = () => (<Check style={green}></Check>);
const CloseIcon = () => (<Close style={red}></Close>);

const Completed = ({completed}) => {

    if(completed === true){
        return (
            <div className="fader" key={completed}>
                <CheckIcon></CheckIcon>
                </div>

            )
    }else{
        return  (
                <div className="fader " key={completed}>
                    <CloseIcon></CloseIcon>
                </div>

            )
    }
};
export default class Row extends Component {
    static propTypes = {

        currentTest:PropTypes.number,
        // data:PropTypes.array
    };
    static defaultProps = {
    };

    render() {
        const step = this.props.step;
        const {name, uid,
            profileUpdated_Name,
            profileUpdated_City,
            /*profileUpdated_Address,*/
            profileUpdated_Phone,
            profileUpdated_Company,
            profileUpdated_Shop,
            profileUpdated_Position,
            profileUpdated_SamsungPlusLogin,


        } = this.props.row;

        const profile  = {
            'Name':profileUpdated_Name,
            'City':profileUpdated_City,
            /*'Address':profileUpdated_Address,*/
            'Phone':profileUpdated_Phone,
            'Company':profileUpdated_Company,
            'Shop':profileUpdated_Shop,
            'Position':profileUpdated_Position,
            'SamsungPlusLogin':profileUpdated_SamsungPlusLogin


        };

        
        return (
             
                    <TableRow>
                        <TableRowColumn><span>{name || uid}</span></TableRowColumn>
                        {
                            Object.keys(profile).map( (field, i) => (

                                <TableRowColumn key={field+i} className={`profile-td ${field === step ? 'active': ''}`}>


                                        <Completed completed={profile[field]}  />



                                </TableRowColumn>
                            ) )
                        }


                    </TableRow>
                )

        
    }
}