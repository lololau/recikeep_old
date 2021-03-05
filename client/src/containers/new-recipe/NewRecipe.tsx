import React from 'react';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TagsBox from '../../components/Tags';
import { PartsComboBox } from '../stepper/RecipesSelection2';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
//mport { fetchSearchIngredients } from '../../slice/ingredients/ingredientsFetch';
import Autosuggestion from '../../components/Autocomplete';
import { useSelector } from 'react-redux';
import { token } from '../../slice/user/userSlice';
import { ingredients } from '../../slice/ingredients/ingredientsSlice';

interface IngredientType {
    inputValue?: string;
    name: string;
    id: number;
}

export const options: IngredientType[] = [
    { id: 0, name: 'fraise' },
    { id: 1, name: 'prout' },
    { id: 2, name: 'caca' },
    { id: 3, name: 'vagin' },
];
export const units: string[] = ['ml', 'dl', 'cl', 'l', 'mg', 'g', 'kg', 'unit', 'filets'];

const NewRecipe = (): JSX.Element => {
    const { t } = useTranslation();

    const idToken = useSelector(token);
    console.log(idToken);

    const ingredientsList = useSelector(ingredients);

    return (
        <Container>
            <h1>{t('new_recipe.title-page')}</h1>
            <br />
            <Box className="title">
                <p>{t('new_recipe.title')}</p>
                <TextField placeholder={t('new_recipe.add-title')} />
            </Box>
            <br />
            <br />
            <Box className="image">
                <p>{t('new_recipe.image')}</p>
                <Button variant="contained">{t('new_recipe.add-image')}</Button>
            </Box>
            <br />
            <br />
            <Box>
                <p>{t('new_recipe.presentation')}</p>
                <TextField fullWidth placeholder={t('new_recipe.add-presentation')} />
            </Box>
            <br />
            <br />
            <Box className="image">
                <p>{t('new_recipe.description')}</p>
                <Button variant="contained">{t('new_recipe.add-description')}</Button>
            </Box>
            <br />
            <br />
            <Box>
                <TagsBox />
            </Box>
            <br />
            <br />
            <Box>
                <PartsComboBox />
            </Box>
            <br />
            <br />
            <Grid container spacing={9}>
                <Grid item xs={5} className="preparation-time" style={{ display: 'block' }}>
                    <p>{t('new_recipe.preparation-time')}</p>
                    <Box style={{ display: 'flex' }}>
                        <TextField fullWidth placeholder={t('new_recipe.add-time')} margin="normal" />
                        <p>{t('new_recipe.minute')}</p>
                    </Box>
                </Grid>
                <Grid item xs={5} className="cooking-time" style={{ display: 'block' }}>
                    <p>{t('new_recipe.cooking-time')}</p>
                    <Box style={{ display: 'flex' }}>
                        <TextField fullWidth placeholder={t('new_recipe.add-time')} margin="normal" />
                        <p>{t('new_recipe.minute')}</p>
                    </Box>
                </Grid>
            </Grid>
            <br />
            <br />
            <Box style={{ marginBottom: 70 }}>
                <p>{t('new_recipe.ingredients')}</p>
                <Grid container spacing={4} style={{ marginBottom: 20, alignItems: 'center' }}>
                    <Grid item xs={3}>
                        <Autosuggestion
                            label="add ingredient"
                            onSelect={(option) => console.log('selected', option)}
                            onAdd={(option) => console.log('added', option)}
                            options={ingredientsList}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autosuggestion
                            label="add unit"
                            onSelect={(option) => console.log('selected', option)}
                            onAdd={(option) => console.log('added', option)}
                            options={top100Films}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField placeholder="Quantity" variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <Button>{t('new_recipe.add')}</Button>
                    </Grid>
                </Grid>
                <Box style={{ width: '100%' }}>
                    <IconButton>
                        <LibraryAddIcon style={{ fontSize: 25, marginLeft: 'auto', marginRight: 'auto' }} />
                    </IconButton>
                </Box>
            </Box>
        </Container>
    );
};

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { name: 'The Shawshank Redemption', id: 1994 },
    { name: 'The Godfather', id: 1972 },
    { name: 'The Godfather: Part II', id: 1974 },
    { name: 'The Dark Knight', id: 2008 },
    { name: '12 Angry Men', id: 1957 },
    { name: "Schindler's List", id: 1993 },
    { name: 'Pulp Fiction', id: 1994 },
    { name: 'The Lord of the Rings: The Return of the King', id: 2003 },
    { name: 'The Good, the Bad and the Ugly', id: 1966 },
    { name: 'Fight Club', id: 1999 },
    { name: 'The Lord of the Rings: The Fellowship of the Ring', id: 2001 },
    { name: 'Star Wars: Episode V - The Empire Strikes Back', id: 1980 },
    { name: 'Forrest Gump', id: 1994 },
    { name: 'Inception', id: 2010 },
    { name: 'The Lord of the Rings: The Two Towers', id: 2002 },
    { name: "One Flew Over the Cuckoo's Nest", id: 1975 },
    { name: 'Goodfellas', id: 1990 },
    { name: 'The Matrix', id: 1999 },
    { name: 'Seven Samurai', id: 1954 },
    { name: 'Star Wars: Episode IV - A New Hope', id: 1977 },
    { name: 'City of God', id: 2002 },
    { name: 'Se7en', id: 1995 },
    { name: 'The Silence of the Lambs', id: 1991 },
    { name: "It's a Wonderful Life", id: 1946 },
    { name: 'Life Is Beautiful', id: 1997 },
    { name: 'The Usual Suspects', id: 1995 },
    { name: 'Léon: The Professional', id: 1994 },
    { name: 'Spirited Away', id: 2001 },
    { name: 'Saving Private Ryan', id: 1998 },
    { name: 'Once Upon a Time in the West', id: 1968 },
    { name: 'American History X', id: 1998 },
    { name: 'Interstellar', id: 2014 },
    { name: 'Casablanca', id: 1942 },
    { name: 'City Lights', id: 1931 },
    { name: 'Psycho', id: 1960 },
    { name: 'The Green Mile', id: 1999 },
    { name: 'The Intouchables', id: 2011 },
    { name: 'Modern Times', id: 1936 },
    { name: 'Raiders of the Lost Ark', id: 1981 },
    { name: 'Rear Window', id: 1954 },
    { name: 'The Pianist', id: 2002 },
    { name: 'The Departed', id: 2006 },
    { name: 'Terminator 2: Judgment Day', id: 1991 },
    { name: 'Back to the Future', id: 1985 },
    { name: 'Whiplash', id: 2014 },
    { name: 'Gladiator', id: 2000 },
    { name: 'Memento', id: 2000 },
    { name: 'The Prestige', id: 2006 },
    { name: 'The Lion King', id: 1994 },
    { name: 'Apocalypse Now', id: 1979 },
    { name: 'Alien', id: 1979 },
    { name: 'Sunset Boulevard', id: 1950 },
    {
        name: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        id: 1964,
    },
    { name: 'The Great Dictator', id: 1940 },
    { name: 'Cinema Paradiso', id: 1988 },
    { name: 'The Lives of Others', id: 2006 },
    { name: 'Grave of the Fireflies', id: 1988 },
    { name: 'Paths of Glory', id: 1957 },
    { name: 'Django Unchained', id: 2012 },
    { name: 'The Shining', id: 1980 },
    { name: 'WALL·E', id: 2008 },
    { name: 'American Beauty', id: 1999 },
    { name: 'The Dark Knight Rises', id: 2012 },
    { name: 'Princess Mononoke', id: 1997 },
    { name: 'Aliens', id: 1986 },
    { name: 'Oldboy', id: 2003 },
    { name: 'Once Upon a Time in America', id: 1984 },
    { name: 'Witness for the Prosecution', id: 1957 },
    { name: 'Das Boot', id: 1981 },
    { name: 'Citizen Kane', id: 1941 },
    { name: 'North by Northwest', id: 1959 },
    { name: 'Vertigo', id: 1958 },
    { name: 'Star Wars: Episode VI - Return of the Jedi', id: 1983 },
    { name: 'Reservoir Dogs', id: 1992 },
    { name: 'Braveheart', id: 1995 },
    { name: 'M', id: 1931 },
    { name: 'Requiem for a Dream', id: 2000 },
    { name: 'Amélie', id: 2001 },
    { name: 'A Clockwork Orange', id: 1971 },
    { name: 'Like Stars on Earth', id: 2007 },
    { name: 'Taxi Driver', id: 1976 },
    { name: 'Lawrence of Arabia', id: 1962 },
    { name: 'Double Indemnity', id: 1944 },
    { name: 'Eternal Sunshine of the Spotless Mind', id: 2004 },
    { name: 'Amadeus', id: 1984 },
    { name: 'To Kill a Mockingbird', id: 1962 },
    { name: 'Toy Story 3', id: 2010 },
    { name: 'Logan', id: 2017 },
    { name: 'Full Metal Jacket', id: 1987 },
    { name: 'Dangal', id: 2016 },
    { name: 'The Sting', id: 1973 },
    { name: '2001: A Space Odyssey', id: 1968 },
    { name: "Singin' in the Rain", id: 1952 },
    { name: 'Toy Story', id: 1995 },
    { name: 'Bicycle Thieves', id: 1948 },
    { name: 'The Kid', id: 1921 },
    { name: 'Inglourious Basterds', id: 2009 },
    { name: 'Snatch', id: 2000 },
    { name: '3 Idiots', id: 2009 },
    { name: 'Monty Python and the Holy Grail', id: 1975 },
];

export default NewRecipe;
