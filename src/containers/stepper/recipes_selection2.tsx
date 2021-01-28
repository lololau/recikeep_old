import { useState } from 'react';
import { RecipesListProps, myRecipes } from '../recipes/recipes';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import Container from '@material-ui/core/Container';
import { Box } from '@material-ui/core';

export const PartsComboBox = (): JSX.Element => {
    const { t } = useTranslation();

    const options: string[] = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
    ];

    const [part] = useState(options[1]);

    return (
        <div>
            <Autocomplete
                value={part}
                id="controllable-states-demo"
                options={options}
                renderInput={(params) => <TextField {...params} label={t('parts.comboBox')} variant="outlined" />}
            />
        </div>
    );
};

const SelectionPartsRecipes: FunctionComponent<RecipesListProps> = (props) => {
    return (
        <List>
            {props.recipes.map((recipe, index) => {
                return (
                    <ListItem divider={true} key={index}>
                        <ListItemText primary={recipe.title} id={index.toString()} />

                        <PartsComboBox />
                    </ListItem>
                );
            })}
        </List>
    );
};

const SelectionParts = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Container>
            <h1>{t('stepper.title-part')}</h1>

            <div className="SelectionRecipesList">
                <SelectionPartsRecipes recipes={myRecipes} />
            </div>
        </Container>
    );
};

export default SelectionParts;
