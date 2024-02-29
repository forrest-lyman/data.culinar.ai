import * as path from 'path';
import * as fs from 'fs';
import {globSync} from 'glob';


const importContent = () => {
    // list files
    const files = globSync('../import/**/*.md');
    
    // create new files
    if (files && files.length > 0) {
        files.forEach(filepath => {
            const [section, filename] = filepath.split('/').slice(-3);
            const name = filename.replace(/-\d+/, '');
            const content = fs.readFileSync(filepath);

            const newPath = path.join('../pages', section + 's', name + '.md');
            fs.writeFileSync(newPath, content);
            
            // console.log({section, name, content})
            // if (match) {
            //     const result = match[1]; // Extract the matched word
            //     console.log(result); // Output: veal-sweetbreads
            // } else {
            //     console.log('No match found in ' + filepath);
            // }
        });
    }
}

try {
    importContent();
} catch (e) {
    console.error('Unable to import data', e);
}