import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as autocompliteService from "../services/autocompliteService";

export const useAutocompleteProcess = (
  entity = '',
  entityFieldsMapping = {
    label: '',
    value: '',
    description: ''
  },
  predefinedItems = [],
  additionalParams,
  onSelect = () => { }
) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchItems = async (offset = 0) => {
    try {
      if (entity) {
        const result = await autocompliteService.fetchEntities(10, offset, searchQuery, entity, additionalParams, entity);
        setItems(formatData(result[entity] || []));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (currentItem) => {
    if (!selectedItems.find(item => currentItem.value === item.value)) {
      const currentItems = selectedItems;
      currentItems.push(currentItem);

      setSelectedItems(currentItems);
      onSelect(currentItems);

      setIsOptionsVisible(false);
    } else {
      toast('Option already selected!');
    }
  };

  const handleUnselect = (currentItem) => {
    const currentItems = selectedItems.filter(item => item !== currentItem);
    setSelectedItems(currentItems);
    onSelect(currentItems);
  };

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const formatData = (data) => {
    if (!entityFieldsMapping) return [];

    return data.map(item => ({
      label: Date.parse(item[entityFieldsMapping.label]) ? item[entityFieldsMapping.label].split('T')[0] : item[entityFieldsMapping.label],
      value: item[entityFieldsMapping.value],
      description: item[entityFieldsMapping.description]
    }));
  };

  useEffect(() => {
    fetchItems();
    if (predefinedItems.length) {
      setSelectedItems(predefinedItems);
    }
  }, [searchQuery]);

  return {
    isOptionsVisible,
    items,
    selectedItems,
    searchQuery,
    setIsOptionsVisible,
    handleSelect,
    handleUnselect,
    handleSearchQueryChange
  };
};

export const useAutocomplete = (allItems = [], predefinedSelectedItems = [], onSelect = () => { }) => {
  const [isDropDownHidden, setIsDropDownHidden] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const handleOpenDropDown = (state) => {
    setIsDropDownHidden(state);
  };

  const handleSelectItem = async (item) => {
    if (!selectedItems.includes(item)) {
      const currentSelectedItems = selectedItems;
      currentSelectedItems.push(item);
      setSelectedItems(currentSelectedItems);
      onSelect(currentSelectedItems);
    } else {
      toast('Option already selected!');
    }
  };

  const handleUnselectItem = (currentItem) => {
    const currentSelectedItems = selectedItems.filter(item => item !== currentItem);
    setSelectedItems(currentSelectedItems);
    onSelect(currentSelectedItems);
  };

  const findOutSelectedItem = (item) => {
    return allItems.find(currItem => currItem.value === item);
  };

  useEffect(() => {
    console.log()
    setSelectedItems(predefinedSelectedItems);
  }, [predefinedSelectedItems]);

  return {
    isDropDownHidden,
    handleOpenDropDown,
    handleSelectItem,
    handleUnselectItem,
    findOutSelectedItem,
    selectedItems,
    search,
    setSearch
  };
}