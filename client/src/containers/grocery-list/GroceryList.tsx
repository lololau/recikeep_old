// Dependencies
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// Slice
import { getApiUrl } from '../../slice/host';
import { fetchGetAGroceryList, selectGroceryList } from '../../slice/groceryList/groceryListSlice';
import { IngredientsGroceryList } from '../../slice/groceriesLists/groceriesListsFetch';
import { fetchCheckTrueGroceryList, fetchCheckFalseGroceryList } from '../../slice/groceriesLists/groceriesListsSlice';
// Material-ui
import {
    Container,
    List,
    ListItemIcon,
    ListItem,
    ListItemText,
    Checkbox,
    Button,
    Grid,
    IconButton,
    Modal,
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';

type IngredientListProps = {
    ingredients: IngredientsGroceryList[];
    groceryId: number;
};

// CheckIngredientsList component
//
// It is possible to :
// - Check / Uncheck an ingredient by verified if its ingredient.checked property

const CheckIngredientsList = (props: IngredientListProps) => {
    const dispatch = useDispatch();

    const handleCheck = (ingredient: IngredientsGroceryList) => () => {
        if (!ingredient.checked) {
            dispatch(fetchCheckTrueGroceryList({ groceryListId: props.groceryId, ingredient: ingredient }));
            return;
        }
        dispatch(fetchCheckFalseGroceryList({ groceryListId: props.groceryId, ingredient: ingredient }));
    };

    return (
        <List>
            {props.ingredients.map((ingredient, index) => {
                return (
                    <ListItem divider={true} key={'CheckIngredientsList' + index} onClick={handleCheck(ingredient)}>
                        <ListItemIcon>
                            <Checkbox edge="start" checked={!!ingredient.checked} tabIndex={-1} disableRipple />
                        </ListItemIcon>
                        <ListItemText
                            primary={ingredient.ingredient}
                            secondary={ingredient.quantity + ' ' + ingredient.unity}
                            id={index.toString()}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
};

interface Params {
    id: string;
}

// GroceryList component
//
// It is possible to :
// - Share the grocery list by clicking on the Sharing Icon
// (onClick : open a modal with the link of the grocery list with the specifid share_uid grocery list property)
// - See all ingredients in the grocery list with <CheckIngredientsList /> component

const GroceryList = (): JSX.Element => {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const { id } = useParams<Params>();
    const groceryList = useSelector(selectGroceryList);

    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const bodyModal = (
        <Grid
            container
            spacing={4}
            style={{
                marginTop: '25%',
                maxWidth: 400,
                marginRight: 'auto',
                marginLeft: 'auto',
                flexDirection: 'column',
                backgroundColor: 'white',
                alignItems: 'center',
            }}
        >
            <Grid item>
                <p>{getApiUrl(`groceryList/share/${groceryList.share_uid}`)}</p>
            </Grid>
            <Grid item>
                <CopyToClipboard text={getApiUrl(`groceryList/share/${groceryList.share_uid}`)}>
                    <Button
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        {t('modal.copy-link')}
                    </Button>
                </CopyToClipboard>
            </Grid>
        </Grid>
    );

    // Execute the effect every 2 seconds
    //
    // Allows to update the checked/unchecked boxes of the ingredient list
    // if a user makes a modification using the shared link

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch(fetchGetAGroceryList(Number(id)));
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Container>
            <Grid
                container
                style={{
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Grid item>
                    <h1>{t('groceryList.title-page')}</h1>
                    <h2>{groceryList.name}</h2>
                </Grid>
                <Grid item>
                    <IconButton
                        style={{
                            float: 'right',
                            position: 'absolute',
                            marginRight: '12px',
                            right: '-2px',
                            top: '58px',
                        }}
                        onClick={() => handleModalOpen()}
                    >
                        <ShareIcon style={{ fontSize: 20 }} color="primary" />
                    </IconButton>
                </Grid>
            </Grid>
            <CheckIngredientsList groceryId={groceryList.id} ingredients={groceryList.ingredients} />
            <List style={{ marginTop: '30px' }}>
                <h4>{t('groceryList.recipes-selected')}</h4>
                {groceryList.recipes.map((recipe, index) => {
                    return (
                        <ListItem divider={true} key={'RecipesSelected' + index}>
                            <ListItemText primary={recipe.name} secondary={recipe.presentation} id={index.toString()} />
                        </ListItem>
                    );
                })}
            </List>

            <Modal open={modalOpen} onClose={handleClose}>
                {bodyModal}
            </Modal>
        </Container>
    );
};

export default GroceryList;
