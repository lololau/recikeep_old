import { useState } from 'react';
import { RecipesListProps, myRecipes } from './recipes';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import InputBase from '@material-ui/core/InputBase';
import ToolsBar from '../toolsbar/toolsbar';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';

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
        <div className="recipes">
            <h1>{t('recipes.title')}</h1>

            <InputBase placeholder={t('recipe.searchBar')} />

            <div className="SelectionRecipesList">
                <SelectionPartsRecipes recipes={myRecipes} />
            </div>
            <Button color="primary">{t('toolsbar.groceryList')}</Button>
            <ToolsBar />
        </div>
    );
};

export default SelectionParts;
