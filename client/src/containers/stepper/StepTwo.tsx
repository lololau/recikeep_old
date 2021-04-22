import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { FC, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { Recipe } from '../../slice/recipes/recipesFetch';

export type numberPartsRecipe = {
    recipe_id: number;
    number_parts: number;
};

type onPartsSelected = (numberPartsByRecipe: numberPartsRecipe[]) => void;

interface SelectionPartsRecipeProps {
    recipes: Recipe[];
    onPartsSelected: onPartsSelected;
}

// SelectionPartsRecipes component
// Component that allows you to enter a number of parts for each recipes selected on the previous step
//
// It is possible to enter a number part by :
// - setting a number part for all selected recipes on the top
// - setting a number part for each recipes into the field on the same row
const SelectionPartsRecipes: FC<SelectionPartsRecipeProps> = (props) => {
    const { t } = useTranslation();

    const [defaultValue, setDefaultValue] = useState<number>(2);

    const initialState = props.recipes.map(() => defaultValue);
    const [parts, setParts] = useState<number[]>(initialState);

    useEffect(() => {
        let finalPartsRecipe: numberPartsRecipe[] = [];
        finalPartsRecipe = props.recipes.map((recipe, index) => ({ number_parts: parts[index], recipe_id: recipe.id }));

        props.onPartsSelected(finalPartsRecipe);
    }, [parts]);

    return (
        <>
            <Grid container spacing={1} style={{ alignItems: 'center', display: 'flex', textAlign: 'center' }}>
                <Grid item>
                    <p>{t('stepper.start-number-parts')}</p>
                </Grid>

                <Grid item>
                    <TextField
                        style={{ width: '50px' }}
                        inputProps={{ style: { textAlign: 'center' } }}
                        placeholder={t('new_recipe.parts_add')}
                        value={defaultValue}
                        onChange={(event) => {
                            const value = Number(event.currentTarget.value);
                            if (value > 0 || value < 1000) {
                                setDefaultValue(value);
                            }
                            const newValues = props.recipes.map(() => value);
                            setParts(newValues);
                        }}
                    />
                </Grid>

                <Grid item>
                    <p>{t('stepper.end-number-parts')}</p>
                </Grid>
            </Grid>

            <List style={{ marginTop: 30 }}>
                {props.recipes.map((recipe, index) => {
                    const newState = [...parts];

                    return (
                        <ListItem divider={true} key={'SelectionPartsRecipes' + index}>
                            <Grid container spacing={1} style={{ alignItems: 'center' }}>
                                <Grid item xs={6} sm={9}>
                                    <ListItemText primary={recipe.name} id={index.toString()} />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        style={{ width: '100%' }}
                                        inputProps={{ style: { textAlign: 'center' } }}
                                        value={parts[index]}
                                        placeholder={t('new_recipe.parts_add')}
                                        variant="outlined"
                                        onChange={(event) => {
                                            const newParts = Number(event.currentTarget.value);
                                            if (newParts >= 0 && newParts < 1000) {
                                                newState[index] = newParts;
                                                setParts(newState);
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};

interface SelectionPartsProps {
    recipes: Recipe[];
    onValidateNumberParts: onPartsSelected;
}

// SelectionParts component : Second step of <GroceryListStepper />
const SelectionParts: FC<SelectionPartsProps> = (props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Container>
            <h1>{t('stepper.title-part')}</h1>

            <div className="SelectionRecipesList" style={{ paddingBottom: '30px' }}>
                <SelectionPartsRecipes
                    recipes={props.recipes}
                    onPartsSelected={(numberPartsByRecipe) => {
                        if (props.onValidateNumberParts) {
                            props.onValidateNumberParts(numberPartsByRecipe);
                        }
                    }}
                />
            </div>
        </Container>
    );
};

export default SelectionParts;
