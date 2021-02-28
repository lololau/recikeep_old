import MobileStepper from '@material-ui/core/MobileStepper';
import React from 'react';
import Button from '@material-ui/core/Button';
import SelectionRecipes from './RecipesSelection1';
import SelectionParts from './RecipesSelection2';
import GroceryList from '../grocery-list/GroceryList';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const getStepperComponent = (step: number) => {
    switch (step) {
        case 0:
            return <SelectionRecipes />;
        case 1:
            return <SelectionParts />;
        case 2:
            return <GroceryList />;
        default:
            return 'Unknown step';
    }
};

const RecipesSelectionStepper = (): JSX.Element => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
