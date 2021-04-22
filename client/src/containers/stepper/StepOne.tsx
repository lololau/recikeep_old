// Dependencies
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// Slice
import { Recipe } from '../../slice/recipes/recipesFetch';
// Component
import SearchBar from '../../components/SearchBar';
// Material-ui
import { Box, List, ListItem, ListItemIcon, ListItemText, Checkbox, Container } from '@material-ui/core';

type onChange = (recipes: Recipe[]) => void;

interface SelectionRecipesListProps {
    recipes: Recipe[];
    onChange: onChange;
}

// SelectionRecipesList component
// Component that allows you to check recipes to be added to the grocery list
const SelectionRecipesList = (props: SelectionRecipesListProps) => {
    const [checked, setChecked] = React.useState([-1]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);

        const filteredRecipes = props.recipes.filter((recipe, index) => {
            return newChecked.includes(index);
        });

        props.onChange(filteredRecipes);
    };

    return (
        <List>
            {props.recipes.map((recipe, index) => {
                return (
                    <ListItem divider={true} key={index} onClick={handleToggle(index)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(index) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={recipe.name} id={index.toString()} />
                    </ListItem>
                );
            })}
        </List>
    );
};

type onSelected = (recipes: Recipe[]) => void;

interface SelectionRecipesProps {
    recipes: Recipe[];
    onSelected?: onSelected;
}

// SelectionRecipes component : First step of <GroceryListStepper />
const SelectionRecipes = (props: SelectionRecipesProps): JSX.Element => {
    const { t } = useTranslation();

    const [recipesDisplay, setRecipesDisplay] = useState(props.recipes);

    const onChange = (ids: string[]) => {
        const newRecipes: Recipe[] = props.recipes.filter((recipe) => {
            let resultat = false;
            for (let i = 0; i < ids.length; i++) {
                if (recipe.id.toString() === ids[i]) {
                    resultat = true;
                }
            }
            return resultat;
        });
        setRecipesDisplay(newRecipes);
    };

    return (
        <Container>
            <h1>{t('stepper.title-selection')}</h1>
            <Box style={{ marginTop: 30, marginBottom: 20 }}>
                <SearchBar onchange={onChange} elements={props.recipes} width="100%" />
            </Box>
            <div className="SelectionRecipesList" style={{ paddingBottom: '30px' }}>
                <SelectionRecipesList
                    recipes={recipesDisplay}
                    onChange={(recipes) => {
                        if (props.onSelected) {
                            props.onSelected(recipes);
                        }
                    }}
                />
            </div>
        </Container>
    );
};

export default SelectionRecipes;
