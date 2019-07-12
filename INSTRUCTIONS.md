# Instructions to use the GUI

![image](https://user-images.githubusercontent.com/22503629/61141304-e6068400-a4ea-11e9-93ab-465fa0e087aa.png)

In the GUI, we have 2 buttons, `ADD WORD` and `ADD DEPENDENCY`, and they are used to do the work as named. 
`ADD WORD` adds a new word and `ADD DEPENDENCY` adds a new dependency.
Our GUI is divided into 2 sections vertically, one on Left Side is for Words and the one on Right Side conains Dependencies.

![image](https://user-images.githubusercontent.com/22503629/61141738-db98ba00-a4eb-11e9-8791-d7e4539e27e9.png)

Here `w1` and `w2` represents the variable names given to the words. 
These would be used to represent that word and all the conditions which we specify fo the word.
By default, considering only the words,they are not constrained to be in any specific order.
For mantaining the words to be in the linear order, we need to add a dependency.
As more words are added, the `nif:nextWord` dependency is added by default b/w the words.
If you want to get the get rid of any dependency between the words, the corresponding dependency can be deleted.

![image](https://user-images.githubusercontent.com/22503629/61143407-c45bcb80-a4ef-11e9-976c-cfee4e064692.png)

On clicking on the word, we can see a box representing a word, this box can be used to specify the conditions of that word.
This can be used to specify various conditions.
`Delete Word` deletes that specific word.
The input box with `w1` represents the word variable name, this is the default variable name which we have given to the word.
This would be used to the represent the word and the dependencies for the word.
The 2 input boxes on the left represent the range of the word.
By default both are set to 1.
This can be updated to specify the range of the word.
The range is specified in {`FROM`,`TO`} form.
`TO` can also be updated to `inf`, in refer to infinity.
So, {0, inf} refers to * and {1, inf} refers to + as in regular expression
`Add Property` button is used to add properties of a word.



### FAQ
- What do we mean by a word in a query?
- What do we mean by a dependency in query?
- Are the words in a linear dependency by default?

<!-- word -->
- What do we need a variable name for words?
- Does a word added really represents a single word or can they be used to specify more than 1 word?
- How to add various conditions and propertiesrelated to a word?
- How are the properties of a word linked. Are they all in OR or in AND?
- Can we delete a word/dependency?
- Can we delete conditions?

<!-- dependency -->
- Are 2 words linked by any dependency by default?

<!-- some examples -->
SOME EXAMPLES
1. 2 continuous words
2. All sentences having 2 NOUNS
