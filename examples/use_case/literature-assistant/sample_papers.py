SAMPLE_PAPER_1 = """
标题：Attention Is All You Need
作者：Vaswani, Ashish; Shazeer, Noam; Parmar, Niki; Uszkoreit, Jakob; Jones, Llion; Gomez, Aidan N.; Kaiser, Lukasz; Polosukhin, Illia
发表期刊：Neural Information Processing Systems (NeurIPS)
发表时间：2017年

摘要：
近年来，深度学习在序列建模和转换任务方面取得了显著进展，但最先进的模型通常依赖复杂的循环或卷积神经网络。本文提出了一种新的简单网络架构——Transformer，完全基于注意力机制，摒弃了循环和卷积。

Transformer在多个机器翻译任务上取得了最先进的结果，同时比基于循环的模型训练速度快得多。

研究方法：
1. 提出了多头注意力机制（Multi-Head Attention）
2. 使用位置编码（Positional Encoding）捕获序列顺序信息
3. 采用编码器-解码器架构

主要结果：
- 在WMT 2014英德翻译任务上达到28.4 BLEU
- 在WMT 2014英法翻译任务上达到41.8 BLEU
- 训练效率比之前的最佳模型提高了3倍

核心结论：
注意力机制足以处理序列建模任务，Transformer架构为自然语言处理带来了革命性的突破。
"""

SAMPLE_PAPER_2 = """
标题：BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding
作者：Devlin, Jacob; Chang, Ming-Wei; Lee, Kenton; Toutanova, Kristina
发表期刊：North American Chapter of the Association for Computational Linguistics (NAACL)
发表时间：2019年

摘要：
我们介绍了一种新的语言表示模型BERT，它代表双向编码器表示来自Transformer。与最近的语言表示模型不同，BERT旨在通过在所有层中联合调节来自左右两侧的上下文来预训练深度双向表示。

研究方法：
1. 提出了Masked Language Model（MLM）预训练任务
2. 使用Next Sentence Prediction（NSP）任务
3. 在大规模未标记文本上进行预训练

主要结果：
- 在GLUE基准测试上取得了最先进的结果
- 在SQuAD v1.1问答任务上达到93.2 F1
- 在SQuAD v2.0上达到83.1 F1

核心结论：
双向预训练对于多种自然语言理解任务至关重要，BERT为下游任务提供了强大的通用语言表示。
"""

SAMPLE_PAPER_3 = """
标题：Deep Residual Learning for Image Recognition
作者：He, Kaiming; Zhang, Xiangyu; Ren, Shaoqing; Sun, Jian
发表期刊：Computer Vision and Pattern Recognition (CVPR)
发表时间：2016年

摘要：
深度残差网络（ResNet）通过引入残差学习框架，使得训练非常深的神经网络成为可能。残差网络在ImageNet分类、COCO检测和分割任务上均取得了突破性的结果。

研究方法：
1. 提出残差学习框架
2. 使用跳跃连接（Skip Connections）
3. 构建极深的网络结构（超过100层）

主要结果：
- 在ImageNet分类任务上达到3.57%错误率
- 首次在ILSVRC 2015比赛中获得冠军
- 网络深度可达152层

核心结论：
残差学习有效地解决了深度神经网络训练中的梯度消失问题，为深度学习的进一步发展奠定了基础。
"""

SAMPLE_PAPER_4 = """
标题：Generative Adversarial Networks
作者：Goodfellow, Ian; Pouget-Abadie, Jean; Mirza, Mehdi; Xu, Bing; Warde-Farley, David; Ozair, Sherjil; Courville, Aaron; Bengio, Yoshua
发表期刊：Neural Information Processing Systems (NeurIPS)
发表时间：2014年

摘要：
我们提出了一种新的框架，通过对抗过程来估计生成模型。该框架同时训练两个模型：一个生成模型G捕捉数据分布，一个判别模型D估计样本来自训练数据而非G的概率。

研究方法：
1. 提出生成对抗网络（GAN）框架
2. 使用极小极大博弈进行训练
3. 交替优化生成器和判别器

主要结果：
- 在多个数据集上生成高质量的合成图像
- 在MNIST手写数字数据集上取得了令人印象深刻的结果
- 为无监督学习提供了新的思路

核心结论：
GAN为生成模型提供了一种强大的训练方法，在图像生成、数据增强等领域具有广泛应用。
"""

SAMPLE_PAPER_5 = """
标题：GPT-3: Language Models are Few-Shot Learners
作者：Brown, Tom B.; Mann, Benjamin; Ryder, Nick; Subbiah, Melanie; Kaplan, Jared; Dhariwal, Prafulla; Neelakantan, Arvind; Shyam, Pranav; Sastry, Girish; Askell, Amanda; Agarwal, Sandhini; Herbert-Voss, Ariel; Krueger, Gretchen; Henighan, Tom; Child, Rewon; Ramesh, Aditya; Ziegler, Daniel M.; Wu, Jeffrey; Winter, Clemens; Hesse, Chris; Chen, Mark; Sigler, Eric; Litwin, Mateusz; Gray, Scott; Chess, Benjamin; Clark, Jack; Berner, Christopher; McCandlish, Sam; Radford, Alec; Sutskever, Ilya; Amodei, Dario
发表期刊：arXiv preprint
发表时间：2020年

摘要：
GPT-3是一个具有1750亿参数的自回归语言模型，在多个NLP任务上展示了强大的少样本学习能力。通过在大量文本数据上进行预训练，GPT-3能够在不进行梯度更新或微调的情况下完成各种任务。

研究方法：
1. 构建超大规模语言模型（175B参数）
2. 在海量文本数据上进行预训练
3. 探索不同规模模型的性能表现

主要结果：
- 在多个NLP基准测试上达到最先进结果
- 展示了强大的少样本和零样本学习能力
- 模型规模与性能呈正相关

核心结论：
大规模语言模型具有强大的泛化能力，为自然语言处理带来了新的范式转变。
"""

PAPERS = [
    ("paper_attention_is_all_you_need", SAMPLE_PAPER_1, {"category": "NLP", "year": 2017, "citation": "NeurIPS 2017"}),
    ("paper_bert", SAMPLE_PAPER_2, {"category": "NLP", "year": 2019, "citation": "NAACL 2019"}),
    ("paper_resnet", SAMPLE_PAPER_3, {"category": "CV", "year": 2016, "citation": "CVPR 2016"}),
    ("paper_gan", SAMPLE_PAPER_4, {"category": "ML", "year": 2014, "citation": "NeurIPS 2014"}),
    ("paper_gpt3", SAMPLE_PAPER_5, {"category": "NLP", "year": 2020, "citation": "arXiv"}),
]


def load_sample_papers(retriever):
    """将示例论文加载到检索器中"""
    for doc_id, content, metadata in PAPERS:
        retriever.add_document(doc_id, content, metadata)
    print(f"已加载 {len(PAPERS)} 篇示例论文到知识库")


if __name__ == "__main__":
    from app.rag import retriever
    load_sample_papers(retriever)
    stats = retriever.get_stats()
    print("知识库统计信息：")
    print(stats)