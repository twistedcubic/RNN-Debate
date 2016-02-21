I trained a Recurrent Neural Network (RNN) with the Long Short-Term Memory (LSTM) architecture on ~1 million characters from political speeches. The RNN has two layers and 128 LSTM internal states, with a total of 256346 parameters to train. LSTM is well-suited to classify and predict texts, as its internal gates can accommodate time lags between characteristic events, whereas the error gradients decay exponentially in a regular convolutional network. The training, cross-validation, and sampling are done using Torch.

I then used Node.js to build a server to parse and select the next lines from the RNN output, depending on the context of the previous arguments in the debate. I then created a frontend to process user input and interactively display the debate.

