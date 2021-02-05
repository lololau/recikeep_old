import React from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useTranslation } from 'react-i18next';

type TagOption = {
    tag: string;
    inputTag?: string;
    id: string;
};

const TagBox = (): JSX.Element => {
    const { t } = useTranslation();

    const tagList: TagOption[] = [
        { tag: t('tags.vegetables'), id: '0' },
        { tag: t('tags.meat'), id: '1' },
        { tag: t('tags.fish'), id: '2' },
        { tag: t('tags.fruits'), id: '3' },
        { tag: t('tags.appetizer'), id: '4' },
        { tag: t('tags.starter'), id: '5' },
        { tag: t('tags.lunch'), id: '6' },
        { tag: t('tags.dinner'), id: '7' },
        { tag: t('tags.dessert'), id: '8' },
        { tag: t('tags.sides'), id: '9' },
    ];

    return (
        <Autocomplete
            multiple
            id="tags-filled"
            options={tagList.map((option) => option.tag)}
            freeSolo
            renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} key={option} />
                ))
            }
            renderInput={(params) => <TextField {...params} variant="filled" label="Tags" />}
        />
    );
};

export default TagBox;
