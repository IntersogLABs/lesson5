# lesson5
Написать функцию deepClone, которая рекурсивно копирует объект по свойствам, если встречает свойство-вложенныйОбъект или массив ->  входим в рекурсию



Написать шаблонизатор, который может работать с функционалиными блоками

Например 

       <ul>
       [[ each item in array ]]
        <li> [[item]] </li>
        [[/each]]
       </ul>

при таком шаблоне и следующем вызове 
template(templateStr, {array:[1,2,3,4]})
должен быть следующий результат

     <ul>
     <li>1</li>
     <li>2</li>
     <li>3</li>
     <li>4</li>
     </ul>
