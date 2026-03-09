const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env or .env.local
const envPath = path.resolve(process.cwd(), '.env');
const envLocalPath = path.resolve(process.cwd(), '.env.local');

let supabaseUrl, supabaseAnonKey;

if (fs.existsSync(envLocalPath)) {
    const envBuffer = fs.readFileSync(envLocalPath);
    const env = dotenv.parse(envBuffer);
    supabaseUrl = env.VITE_SUPABASE_URL;
    supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;
} else if (fs.existsSync(envPath)) {
    const envBuffer = fs.readFileSync(envPath);
    const env = dotenv.parse(envBuffer);
    supabaseUrl = env.VITE_SUPABASE_URL;
    supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;
}

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
        // Try to get table info from another source or just report no data
        console.log('No data in projects table to check columns.');
        // Try catching a select error by selecting a non-existent column
        const { error: testError } = await supabase.from('projects').select('images').limit(1);
        if (testError && testError.code === 'PGRST204') {
            console.log('Column "images" DOES NOT exist.');
        } else if (!testError) {
            console.log('Column "images" DOES exist.');
        } else {
            console.log('Error testing for "images" column:', testError);
        }
    }
}

checkColumns();
