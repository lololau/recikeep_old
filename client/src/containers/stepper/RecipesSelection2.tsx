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

type onPartsSelected = (ingredientsListWithQuantityUpdated: IngredientsRecipe[]) => void;

interface SelectionPartsRecipeProps {
    recipes: Recipe[];
    onPartsSelected?: onPartsSelected;
}

const SelectionPartsRecipes: FC<SelectionPartsRecipeProps> = (props) => {
    const { t } = useTranslation();

    return (
        <List>
            {props.recipes.map((recipe, index) => {
                const [numberParts, setNumberParts] = useState<number>(recipe.number_parts);

                //const changeIngredientsQuantity = (number: number) => {};

                return (
                    <ListItem divider={true} key={'SelectionPartsRecipes' + index}>
                        <ListItemText primary={recipe.name} id={index.toString()} />

                        <TextField
                            placeholder={t('new_recipe.parts_add')}
                            value={numberParts}
                            onChange={(event) => setNumberParts(Number(event.currentTarget.value))}
                        />
                    </ListItem>
                );
            })}
        </List>
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
