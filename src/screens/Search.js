import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const Search = () => {
    const [query, setQuery] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Search</Text>
            <TextInput
                style={styles.input}
                placeholder="Type to search..."
                value={query}
                onChangeText={setQuery}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 24,
        marginBottom: 12,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 18,
    },
});

export default Search;