# rect-pdf-exemplo-erro

A JSON file was used to simulate PDF generation.  
The JSON has the structure of a header and data...  
In the data, we have some subheaders and the `listaMovimentos`, which contains the large volume of data.  

The `listaMovimentos` in the standard JSON contains 5787 items.  

If you remove items until there are 5711 left, the PDF will be generated successfully! It will take almost 4 minutes...  
And as you reduce the size of `listaMovimentos`, the generation time also decreases.  

If you remove items down to 5712, the PDF will not be generated, causing the error mentioned in ISSUE 2974.  
Above 5712, it will no longer work. And until the error occurs, it takes around 3 to 3.5 minutes.  

Formula to calculate how many lines should be removed from the JSON to reach the desired number of items:  

1 item in the list = 7 lines in the JSON -> A  
Number of items to remove -> B  

**A * B = Total number of lines that must be removed from the `listaMovimentos` in the JSON.**  

In any case, more than 3 minutes to generate a PDF is very slow, especially for the end-user using it in production.  

This occurs when clicking **Button 1**...  
File: `GeneratorPdf.tsx`  

---  
**Button 2** has a manual pagination solution, setting the number of items per page, among other things. However, it is not the best solution.  
Although it is more than 5 times faster, there is no way to determine the size of each line in every report generated, making this type of management unfeasible for all reports.  

File: `GeneratorPdfManually.tsx`  

---  
You can delete the `node_modules` folder and `yarn.lock` and change the version of `@react-pdf/renderer` in the `package.json`.  
A version below 4.x will work, while any version above 4.x will not work.