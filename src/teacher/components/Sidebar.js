import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
const Sidebar  = (props) => (
            <aside className="sidebar ">

                    <List>
                        <ListItem primaryText="Inbox" />
                        <ListItem primaryText="Starred" />
                        <ListItem primaryText="Sent mail"  />
                        <ListItem primaryText="Drafts"  />
                        <ListItem primaryText="Inbox"  />
                    </List>

            </aside>
);

export default connect(state => state)(Sidebar);
