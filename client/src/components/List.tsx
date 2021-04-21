// Dependencies
import React from 'react';
// Material-ui
import { IconButton, ListItem, ListItemText, ListItemSecondaryAction, List } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

type onRemove = (elt: Element) => void;

type ListProps = {
    listElements: Element[];
    onRemoveElement?: onRemove;
};

export interface Element {
    name: string;
    id: number;
}

// List genereric component
//
// Display a element from a list by :
// - Element name
// - A delete icon at the end of the row

const ListComponent = (props: ListProps): JSX.Element => (
    <List>
        {props.listElements.map((eltList, index) => {
            return (
                <ListItem divider={true} key={index}>
                    <ListItemText primary={eltList.name} id={index.toString()} />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            onClick={() => {
                                if (props.onRemoveElement) {
                                    props.onRemoveElement(eltList);
                                }
                            }}
                        >
                            <DeleteIcon style={{ fontSize: 15 }} color="primary" />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        })}
    </List>
);

export default ListComponent;
