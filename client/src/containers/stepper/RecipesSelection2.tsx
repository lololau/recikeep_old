import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { FC, useState } from 'react';
import Container from '@material-ui/core/Container';
// import { selectRecipes } from '../../slice/recipes/recipesSlice';
// import { useSelector } from 'react-redux';
import { Recipe } from '../../slice/recipes/recipesFetch';
import { IngredientsRecipe } from '../../slice/ingredients/ingredientsFetch';
import { Button } from '@material-ui/core';

type onPartsSelected = (numberPartsByRecipe: IngredientsRecipe[]) => void;

interface SelectionPartsRecipeProps {
    recipes: Recipe[];
    onPartsSelected?: onPartsSelected;
}

const SelectionPartsRecipes: FC<SelectionPartsRecipeProps> = (props) => {
    const { t } = useTranslation();

    const [defaultValue, setDefaultValue] = useState<number>(2);

    const initialState = props.recipes.map(() => defaultValue);
    const [parts, setParts] = useState<number[]>(initialState);

    return (
        <>
            <TextField
                style={{ width: '10%', textAlign: 'center' }}
                placeholder={t('new_recipe.parts_add')}
                value={defaultValue}
                onChange={(event) => {
                    const value = Number(event.currentTarget.value);
                    setDefaultValue(value);
                }}
            />
            <Button
                onClick={() => {
                    const newValues = props.recipes.map(() => defaultValue);
                    setParts(newValues);
                }}
            >
                {t('stepper.new-number-parts')}
            </Button>
            <List>
                {props.recipes.map((recipe, index) => {
                    const newState = [...parts];

                    return (
                        <ListItem divider={true} key={'SelectionPartsRecipes' + index}>
                            <ListItemText primary={recipe.name} id={index.toString()} />

                            <TextField
                                value={parts[index]}
                                placeholder={t('new_recipe.parts_add')}
                                onChange={(event) => {
                                    const newParts = Number(event.currentTarget.value);
                                    newState[index] = newParts;
                                    setParts(newState);
                                }}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};

type onValidateNumberParts = (groceryList: IngredientsRecipe[]) => void;

interface SelectionPartsProps {
    recipes: Recipe[];
    onValidateNumberParts: onValidateNumberParts;
}

const SelectionParts: FC<SelectionPartsProps> = (props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Container>
            <h1>{t('stepper.title-part')}</h1>

            <div className="SelectionRecipesList">
                <SelectionPartsRecipes recipes={props.recipes} />
            </div>
        </Container>
    );
};

export default SelectionParts;
