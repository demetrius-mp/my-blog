+++
title = "BERT Overview"
description = "Summarizing how BERT works, and explaining it's main features."
date = 2023-01-13
updated = 2023-01-13
slug = "bert-overview"

[extra]
show_description = true

[taxonomies]
tags = ["nlp", "machine-learning"]
+++

## How it works

BERT uses a framework that consists on the following steps, which are the main steps of a transfer learning process: Pre Training, and Fine Tuning. These steps happens as follows.

### Pre Training

Initially, the model will load non-contextual embeddings (Word2Vec, for example), and then, the model will be trained using both language modeling, and representation learning objectives.

#### Masked Language Modeling (MLM)

Consists in training the model using the strategy of predicting a masked token in a sequence. This is the **Language Modeling objective**.

#### Next Sentence Prediction (NSP)

Consists in training the model using the strategy of predicting whether a sequence best fits after another given sequence. This task is important because some downstream tasks have better results when the model is able to understand not only token-to-token relationships, but also sequence-to-sequence relationships.

Since Language Modeling is not capable of acquiring this knowledge, we need this task, which relates to the **Representation Learning objective**.

{% alert(type="error") %}
Verify if the following statement is true: *"Predicting whether a sequence best fits after another given sequence"*.

Is it actually a binary decision, or does the model try to create a sequence?
{% end %}

### Fine tuning

The fine tuning process depends on the downstream task. The modifications on the model should be minimal, affecting mostly the classifier part, which is, input and output layers.

After defining the classifier accordingly to the downstream task, the model must be trained using the dataset from the downstream task. This tasks can be, for example, sentiment analysis, span annotation, etc.

This training using the specific dataset will adjust the model parameters to best fit the specific downstream task domain.

## Main Features

The combination of these features is what makes BERT stand out when compared to other models.

### Transfer Learning

Transfer learning consists of acquiring common knowledge, that could potentially be used in various tasks (in NLP, for example, this knowledge could be verb tenses, pronouns, etc), and then use or refine this knowledge in specific tasks. In BERT's case, transfer learning happens as follows:

- During **pre training**, the model should acquire the common knowledge.
- During **fine tuning**, the model should refine and adjust this knowledge, given that it uses the specific downstream task dataset.

### Bidirectional encoding

This means that BERT actually embeds context into a token from both it's left and right side, and not just use the left side context, or makes an aggregation from both sides. Bidirectional encoding helps a lot in disambiguating a word.

This is possible thanks to the combination of the pre training strategy (MLM + NSP), and the usage of transformers, which includes self attention mechanisms.

### Pre Training approach

The most used pre training approaches are **fine tuning**, and **feature based**. BERT uses the fine tuning approach, which is explained below, as long as the feature based.

#### Fine Tuning

This strategy consists in pre training a somewhat generic model, and then make minimal changes to it, so that it is usable in a downstream task.

After this, the model should be trained using a downstream task's specific dataset. This process is what will fine tune the model to work properly with a given downstream task.

Usually, this fine tuning process is not expensive, given that the model was pre trained, and most of its parameter are already very good. Clearly, this helps to create many downstream task specific models from a single pre trained model.

#### Feature Based

On the feature based approach, the model is pre trained specifically for a single downstream task. This might require a specific architecture, which can mean that the model won't be usable for other kinds of tasks.

### Training Speed

Since it uses transformers, which is actually a stack of self attention mechanisms, BERT is parallelizable within a single example.

Some models use **Recurrent Neural Networks**, that, despite having a lower complexity in the *Big O Notation*, is not parallelizable.
