import { supabase } from './src/lib/supabaseClient';

async function checkColumns() {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching projects:', error);
        return;
    }

    if (data && data.length > 0) {
        console.log('Columns in projects table:', Object.keys(data[0]));
    } else {
        console.log('No data in projects table to check columns.');
    }
}

checkColumns();
