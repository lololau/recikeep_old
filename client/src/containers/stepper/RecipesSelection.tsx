import MobileStepper from '@material-ui/core/MobileStepper';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import SelectionRecipes from './RecipesSelection1';
import SelectionParts, { numberPartsRecipe } from './RecipesSelection2';
import AddMoreIngredients from './RecipesSelection3';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { selectRecipes } from '../../slice/recipes/recipesSlice';
import { useSelector } from 'react-redux';
import { Recipe } from '../../slice/recipes/recipesFetch';
import { IngredientsGroceryList } from '../../slice/groceriesLists/groceriesListsFetch';
import { fetchAddGroceryList } from '../../slice/groceriesLists/groceriesListsSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';

const RecipesSelectionStepper = (): JSX.Element => {
    const [activeStep, setActiveStep] = useState(0);
    const [recipesSelected, setRecipesSelected] = useState<Recipe[]>([]);
    const [numberPartsByRecipe, setnumberPartsByRecipe] = useState<numberPartsRecipe[]>([]);
    const [ingredientsList, setIngredientsList] = useState<IngredientsGroceryList[]>([]);

    const history = useHistory();
    const dispatch = useAppDispatch();
    const recipes = useSelector(selectRecipes);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepperComponent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <SelectionRecipes
                        recipes={recipes}
                        onSelected={(recipesSelect) => {
                            console.log('select: ', recipesSelect);
                            setRecipesSelected(recipesSelect);
                        }}
                    />
                );
            case 1:
                return (
                    <SelectionParts
                        recipes={recipesSelected}
                        onValidateNumberParts={(numberPartsByRecipe) => {
                            console.log('numberPartsByRecipe: ', numberPartsByRecipe);
                            setnumberPartsByRecipe(numberPartsByRecipe);
                        }}
                    />
                );
            case 2:
                return (
                    <AddMoreIngredients
                        numberPartsByRecipe={numberPartsByRecipe}
                        onValidation={(ingredientsList) => {
                            recipesSelected.map((recipe) => {
                                if (recipe.presentation) {
                                    console.log('selec recipes :', recipe.name + ' ' + recipe.presentation);
                                    return;
                                }
                                console.log('selec recipes :', recipe.name);
                            });
                            console.log('ingredientsList: ', ingredientsList);
                            setIngredientsList(ingredientsList);
                        }}
                    />
                );
            default:
                return 'Unknown step';
        }
    };

    const [marginLeft, setMarginLeft] = useState<number>(0);

    const margin = () => {
        let newMargin;
        if (window.screen.width < 600) {
            newMargin = 0;
        } else {
            newMargin = 230;
        }
        setMarginLeft(newMargin);
    };

    useEffect(() => {
        margin();
    }, [window.screen.width]);

    return (
        <Container>
            <Box>{getStepperComponent(activeStep)}</Box>
            <MobileStepper
                variant="progress"
                steps={3}
                style={{ position: 'fixed', bottom: '57px', marginLeft: marginLeft }}
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        disabled={recipesSelected.length <= 0}
                        onClick={async () => {
                            if (activeStep < 2) {
                                handleNext();
                                return;
                            }
                            try {
                                // Get the actual date-time
                                const today = new Date();
                                const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                                const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                                const dateTime = date + '  ' + time;

                                const recipesComment = recipesSelected.map((recipe) => {
                                    if (recipe.presentation) {
                                        return recipe.name + ' - ' + recipe.presentation;
                                    } else {
                                        return recipe.name;
                                    }
                                });

                                console.log('recipesComment', recipesComment);

                                const action = await dispatch(
                                    fetchAddGroceryList({
                                        ingredients: ingredientsList,
                                        name: dateTime,
                                    }),
                                );
                                const result = unwrapResult(action);
                                console.log('result: ', result);
                                history.push(`/groceryList/${result.id}`);
                            } catch (e) {
                                console.error(e);
                            }
                        }}
                    >
                        {activeStep < 2 ? 'Next' : 'OK !'}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        Back
                    </Button>
                }
            />
        </Container>
    );
};

export default RecipesSelectionStepper;
