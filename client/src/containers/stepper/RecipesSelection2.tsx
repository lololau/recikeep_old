import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { FC, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
// import { selectRecipes } from '../../slice/recipes/recipesSlice';
// import { useSelector } from 'react-redux';
import { Recipe } from '../../slice/recipes/recipesFetch';
import { Button } from '@material-ui/core';

export type numberPartsRecipe = {
    recipe_id: number;
    number_parts: number;
};

type onPartsSelected = (numberPartsByRecipe: numberPartsRecipe[]) => void;

interface SelectionPartsRecipeProps {
    recipes: Recipe[];
    onPartsSelected: onPartsSelected;
}

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
            <Grid container spacing={0} style={{ alignItems: 'center', display: 'flex' }}>
                <Grid item xs={2}>
                    <TextField
                        style={{ width: '100%', textAlign: 'center' }}
                        placeholder={t('new_recipe.parts_add')}
                        value={defaultValue}
                        variant="outlined"
                        onChange={(event) => {
                            const value = Number(event.currentTarget.value);
                            if (value > 0 || value < 1000) {
                                setDefaultValue(value);
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        onClick={() => {
                            const newValues = props.recipes.map(() => defaultValue);
                            setParts(newValues);
                        }}
                    >
                        {t('stepper.new-number-parts')}
                    </Button>
                </Grid>
            </Grid>
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
                                    if (newParts >= 0 && newParts < 1000) {
                                        newState[index] = newParts;
                                        setParts(newState);
                                    }
                                }}
                            />
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

const SelectionParts: FC<SelectionPartsProps> = (props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Container>
            <h1>{t('stepper.title-part')}</h1>

            <div className="SelectionRecipesList">
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
