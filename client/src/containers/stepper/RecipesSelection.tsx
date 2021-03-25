import MobileStepper from '@material-ui/core/MobileStepper';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SelectionRecipes from './RecipesSelection1';
import SelectionParts, { numberPartsRecipe } from './RecipesSelection2';
import GroceryList from '../grocery-list/GroceryList';
import AddMoreIngredients from './RecipesSelection3';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { selectRecipes } from '../../slice/recipes/recipesSlice';
import { useSelector } from 'react-redux';
import { Recipe } from '../../slice/recipes/recipesFetch';

const RecipesSelectionStepper = (): JSX.Element => {
    const [activeStep, setActiveStep] = useState(0);
    const [recipesSelected, setRecipesSelected] = useState<Recipe[]>([]);
    const [numberPartsByRecipe, setnumberPartsByRecipe] = useState<numberPartsRecipe[]>([]);
    console.log(numberPartsByRecipe);

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
                return <AddMoreIngredients />;
            default:
                return 'Unknown step';
        }
    };

    return (
        <Container>
            <MobileStepper
                variant="progress"
                steps={3}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
                        Next
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        Back
                    </Button>
                }
            />

            <Box>{getStepperComponent(activeStep)}</Box>
        </Container>
    );
};

export default RecipesSelectionStepper;
