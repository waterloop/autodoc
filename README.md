# AUTODOCS TOOL FOR WATERLOOP

Autodocs is a program that parses the test files in a directory and creates a simple html file for the cms-backend API


## USAGE

Run autodoc script with the commands 

```bash
node --experimental-modules --es-module-specifier-resolution=node ./autodoc/src/index.mjs autodoc/src/testing 
```

```./autodoc/src/index.mjs``` is the path to run the autodoc script while ```autodoc/src/testing``` is the path to the test files that are to be parsed to and written to an html file at ```cwd/autodocHTML```.

Note that ```cwd``` refers to the current working directory (the file path where you run this program)

## TESTS

Run tests with command:

```bash
npm test
```

Test ensure that outputs of methods are proper before being written to an HTML file.