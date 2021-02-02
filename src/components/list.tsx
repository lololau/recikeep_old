import React from 'react';
import List from '@material-ui/core/List';
import { IconButton, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

type ListProps = {
    listElements: Element[];
};

type Element = {
    name: string;
    id: string;
};

const ListComponent = (props: ListProps): JSX.Element => {
    return (
        <List>
            {props.listElements.map((eltList, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <ListItemText primary={eltList.name} id={index.toString()} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end">
                                <DeleteIcon style={{ fontSize: 15 }} color="primary" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default ListComponent;
