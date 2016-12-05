import React, {Component, PropTypes} from 'react';

import { TableRow, TableHeaderColumn} from 'material-ui/Table';

export default class RowHeader extends Component {
    static propTypes = {};
    static defaultProps = {
    };

    render() {
        
        return (

            <TableRow >
                <TableHeaderColumn>Ученик</TableHeaderColumn>
                <TableHeaderColumn>Profile completed</TableHeaderColumn>
                <TableHeaderColumn className="progress">

                    <ol>

                        {

                            this.props.answers.map((el, i) => {

                                    return (
                                        <li key={i}>{i + 1}</li>

                                    )
                                }
                            )
                        }

                    </ol>

                </TableHeaderColumn>
            </TableRow>
                )

        
    }
}