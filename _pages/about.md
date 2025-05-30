---
permalink: /
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
<style>
    .experience-card {
        display: flex;
        align-items: center;
        background: #f9f9f9;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 0px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .experience-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }
    .experience-logo {
        width: 60px;
        height: 60px;
        margin-right: 20px;
        border-radius: 8px;
        object-fit: contain;
    }
    .experience-info {
        font-family: "Segoe UI", sans-serif;
    }
    .experience-info strong {
        font-size: 1.1em;
    }
    .experience-info a {
        text-decoration: none;
        color: #ca6f6f;
    }
    .experience-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    }
    .experience-card {
        box-sizing: border-box;
    }
    .publication-card {
    display: flex;
    align-items: center;
    padding: 3px;
    border: 1.5px solid #ddd;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    background: #fff;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box; /* 推荐添加，确保padding和border不额外增加尺寸 */
    }
    .publication-card.featured {
        border-color: #f2a678;       /* 哈密瓜色边框 */
        background: #f9e6db;         /* 非常浅的哈密瓜色背景 */
        box-shadow: 0 8px 16px rgba(242, 166, 120, 0.4); /* 哈密瓜色半透明阴影 */
        z-index: 10;
    }
    .news-section {
    font-family: sans-serif; /* 设置字体，你可以改成你网站的主题字体 */
    margin-bottom: 30px; /* 与下方内容的间距 */
    }

    /* 新闻标题 "News" */
    .news-section h3 {
        margin-bottom: 5px; /* 标题和下方分割线的间距 */
        color: #333; /* 标题颜色 */
        /* 可选：给标题加一点装饰 */
        /* border-left: 4px solid #f2a678; /* 左侧哈密瓜色强调线 */
        /* padding-left: 10px; /* 强调线和文字的间距 */
    }

    /* 分割线 <hr> */
    .news-section hr {
        border: 0; /* 移除默认边框 */
        height: 1px; /* 设置高度为1像素，形成细线 */
        background-color: #ddd; /* 分割线颜色，浅灰色 */
        margin-bottom: 15px; /* 分割线和新闻列表的间距 */
    }

    /* 新闻列表容器 <ul> */
    .news-list {
        list-style: none; /* 移除默认的列表项目符号 (小圆点) */
        padding-left: 0; /* 移除默认的左内边距 */
    }

    /* 每条新闻 <li> */
    .news-list li {
        padding: 10px 5px; /* 上下10px，左右5px的内边距，让文字不贴边 */
        margin-bottom: 8px; /* 新闻条目之间的间距 */
        border-left: 3px solid transparent; /* 左侧边框，初始透明，宽度3px。这是一个占位符，用于鼠标悬停时显示颜色而内容不跳动 */
        transition: background-color 0.3s ease, border-left-color 0.3s ease, transform 0.2s ease-out; /* 过渡效果：背景色、左边框颜色、位移，持续时间和缓动函数 */
        /* 入场动画设置 */
        opacity: 0; /* 初始完全透明 */
        transform: translateX(-20px); /* 初始向左偏移20px */
        animation: slideInFadeIn 0.5s ease-out forwards; /* 应用名为 slideInFadeIn 的动画，持续0.5秒，ease-out缓动，动画结束后保持最后一帧状态 */
    }

    /* 为列表项设置交错的入场动画延迟 */
    .news-list li:nth-child(1) { animation-delay: 0.1s; } /* 第1个延迟0.1秒 */
    .news-list li:nth-child(2) { animation-delay: 0.2s; } /* 第2个延迟0.2秒 */
    .news-list li:nth-child(3) { animation-delay: 0.3s; } /* 第3个延迟0.3秒 */
    .news-list li:nth-child(4) { animation-delay: 0.4s; } /* 第4个延迟0.4秒 */
    /* 如果有更多新闻条目，继续添加 :nth-child(5), :nth-child(6) 等 */

    /* 定义入场动画：从左侧滑入并淡入 */
    @keyframes slideInFadeIn {
        to { /* 动画结束状态 */
            opacity: 1; /* 完全不透明 */
            transform: translateX(0); /* 回到原始水平位置 */
        }
    }

    /* 鼠标悬停在某条新闻 <li> 上时的效果 */
    .news-list li:hover {
        background-color: #f9f9f9; /* 背景变为浅灰色 */
        border-left-color: #f2a678; /* 左边框变为哈密瓜色 (之前透明的边框现在显示出来了) */
        transform: translateX(5px); /* 整个条目向右轻微移动5px */
    }

    /* 新闻条目中的链接 <a> */
    .news-list li a {
        color: #007bff; /* 链接颜色，标准蓝色，或你的主题色 */
        text-decoration: none; /* 移除默认下划线 */
        font-weight: 500; /* 字体稍微加粗 */
        transition: color 0.2s ease, text-decoration 0.2s ease; /* 颜色和下划线的过渡效果 */
    }

    /* 鼠标悬停在链接 <a> 上时的效果 */
    .news-list li a:hover {
        color: #0056b3; /* 链接颜色变深 */
        text-decoration: underline; /* 添加下划线 */
    }

    /* 新闻条目中的 emoji 表情 <span class="emoji"> */
    .news-list li .emoji {
        display: inline-block; /* 允许对其进行 transform 变换 */
        margin-left: 5px; /* 与前面文字的间距 */
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55); /* transform属性的过渡效果，使用了一个有回弹效果的 cubic-bezier 函数 */
    }

    /* 当鼠标悬停在某条新闻 <li> 上时，该条目内的 .emoji 的效果 */
    .news-list li:hover .emoji {
        transform: scale(1.3) rotate(15deg); /* emoji 放大1.3倍并旋转15度 */
    }
</style>
<html> 
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Homemade+Apple&display=swap');
        body {
            background-color:	 #FFFFFF;
            font-family: 'Arial Rounded MT Bold', 'Verdana', sans-serif;
            font-size: 15px;
        }
        .main-heading {
            font-family: 'Permanent Marker', cursive;
            text-align: center;
            color: #ca6f6f;
        }
        div.markdown-body a,a {
            text-decoration: none !important;
            color: #ca6f6f;
            transition: all 0.3s ease; /* 平滑过渡效果 */
        }
        div.markdown-body a:hover, a:hover {
            color: #c71585;            /* 悬浮时变深一点的颜色 */
            text-decoration: underline; /* 加上悬浮时的下划线 */
        }
    </style>
</head>
<body>
<h1 class="main-heading">Hi there <img src="images/Hi.gif" width="40px"> Welcome to my Homepage!</h1>
</body>
</html>

I am an undergraduate (2022-2026) at Xidian University, <em> focusing on Vision-Language-Action.</em>
I work at [MVIG@SJTU](https://www.mvig.org/index.html) with [Prof. Lixin Yang](https://lixiny.github.io/) and [Prof. Cewu Lu](https://www.mvig.org/index.html).

News
---------------
<div class="news-section">
    <hr>
    <ul class="news-list">
        <li>
            <a href="https://selen-suyue.github.io/MBApage" target="_blank" rel="noopener noreferrer">MBA</a> is accepted in IEEE RA-L 2025 <span class="emoji"></span>
        </li>
        <li>
            Unleash the potential of Autoregressive model in imitation learning: <a href="https://selen-suyue.github.io/DspNet" target="_blank" rel="noopener noreferrer">Dense Policy</a> is on preprint!
        </li>
        <li>
            Our work <a href="#">Advdisplay</a> was accepted at AAAI 2025 <span class="emoji"></span>
        </li>
        <li>
            In charge of <a href="https://github.com/MSC-XDU" target="_blank" rel="noopener noreferrer">Microsoft Club</a>. Feel free to reach out if you'd like to join.
        </li>
    </ul>
</div>

Research Experience
--------------
<div class="experience-container">
  <div class="experience-card">
      <img src="images/SJTU.png" alt="SJTU logo" class="experience-logo">
      <div class="experience-info">
          <strong>Shanghai Jiao Tong University</strong><br>
          July 2024 - Now<br>
          Research intern at <a href="https://www.mvig.org/index.html"><em>MVIG</em></a> Lab
      </div>
  </div>

  <div class="experience-card">
      <img src="images/XDU.png" alt="Xi'dian logo" class="experience-logo">
      <div class="experience-info">
          <strong>Xidian University</strong><br>
          September 2023 - July 2024<br>
          Research intern at <a href="https://web.xidian.edu.cn/mggong/"><em>OMEGA</em></a> Lab
      </div>
  </div>
</div>

Publications
--------------
<div class="publication-card featured">
 <div style="display: flex; align-items: center;">
    <img src="images/dsp.png" alt="DSP" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>Dense Policy: Bidirectional Autoregressive Learning of Actions</strong><br>
        <i style="font-size: 13px;">
            <a href="https://selen-suyue.github.io" target="_blank"><strong>Yue Su</strong></a>*, 
            <a href="https://scholar.google.com/citations?user=WurpqEMAAAAJ&hl=en" target="_blank">Xinyu Zhan</a>*, 
            <a href="https://tonyfang.net/" target="_blank">Hongjie Fang</a>, 
            <a href="https://hanxue.me/" target="_blank">Han Xue</a>, <br>
            <a href="https://fang-haoshu.github.io/" target="_blank">Haoshu Fang</a>, 
            <a href="https://dirtyharrylyl.github.io/" target="_blank">Yong-Lu Li</a>, 
            <a href="http://mvig.org" target="_blank">Cewu Lu</a>, 
            <a href="https://lixiny.github.io" target="_blank">Lixin Yang</a>&dagger;
        </i><br>
        Propose Dense Policy, A bidirectional robotic autoregressive policy, which infers trajectories by gradually expanding actions from sparse keyframes, demonstrated exceeding diffusion policies.<br>
        <a href="https://arxiv.org/abs/2503.13217"><em>[arXiv]</em></a>
        <a href="https://selen-suyue.github.io/DspNet/"><em>[website]</em></a>
        <a href="https://github.com/Selen-Suyue/DensePolicy"><em>[3D-code]</em></a>
      <a href="https://github.com/Selen-Suyue/DensePolicy2D"><em>[2D-code]</em></a>
    </div>
</div>
</div>
<div class="publication-card featured">
 <div style="display: flex; align-items: center;">
    <img src="images/MBA.png" alt="MBA" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>Motion Before Action: Diffusing Object Motion as Manipulation Condition</strong><br>
        <i style="font-size: 13px;">
            <a href="https://selen-suyue.github.io" target="_blank"><strong>Yue Su</strong></a>*, 
            <a href="https://scholar.google.com/citations?user=WurpqEMAAAAJ&hl=en" target="_blank">Xinyu Zhan</a>*, 
            <a href="https://tonyfang.net/" target="_blank">Hongjie Fang</a>, 
            <a href="https://dirtyharrylyl.github.io/" target="_blank">Yong-Lu Li</a>, 
            <a href="http://mvig.org" target="_blank">Cewu Lu</a>, 
            <a href="https://lixiny.github.io" target="_blank">Lixin Yang</a>&dagger;
        </i><br>
        Propose MBA, a novel plug-and-play module leveraging cascaded diffusion processes to generate actions guided by object motion, enabling seamless integration with manipulation policies.<br>
      <b><i style="color:#83a1c7;">IEEE RA-L 2025</i></b>
      <br>
        <a href="https://arxiv.org/abs/2411.09658"><em>[arxiv]</em></a> <a href="https://selen-suyue.github.io/MBApage"><em>[website]</em></a>
        <a href="https://github.com/Selen-Suyue/MBA"><em>[code]</em></a>
    </div>
</div>
</div>
<div style="display: flex; align-items: center;">
    <img src="images/GAP.png" alt="RIaa" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>Generative Adversarial Patches for Physical Attacks on Cross-Modal Pedestrian Re-Identification</strong><br>
       <i style="font-size: 13px;">
    <a href="https://selen-suyue.github.io" target="_blank"><strong>Yue Su</strong></a>, 
    <a href="https://scholar.google.com/citations?user=JkQmO-kAAAAJ&hl=en" target="_blank">Hao Li</a>&dagger;, 
    <a href="https://web.xidian.edu.cn/mggong/" target="_blank">Maoguo Gong</a>&dagger;
</i><br>
A generative physical adversarial attack on VI-ReID models perturbs modality-invariant features. <br>
      <a href="https://arxiv.org/abs/2410.20097"><em>[arxiv]</em></a>
    </div>
</div>
<br>
<div style="display: flex; align-items: center;">
    <img src="images/iraa.png" alt="Raa" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>AdvDisplay: Adversarial Display Assembled by Thermoelectric Cooler for Fooling Thermal Infrared Detectors</strong><br>
      <i style="font-size: 13px;">
    <a href="https://scholar.google.com/citations?user=JkQmO-kAAAAJ&hl=en" target="_blank">Hao Li</a>&dagger;, 
    <a href="https://scholar.google.com/citations?user=eX7Ra5UAAAAJ&hl=en" target="_blank">Fanggao Wan</a>, 
    <a href="https://selen-suyue.github.io" target="_blank"><strong>Yue Su</strong></a>, 
    <a href="https://ywuchina.github.io/" target="_blank">Yue Wu</a>, 
    <a href="https://scholar.google.com/citations?user=h4PExPwAAAAJ&hl=en" target="_blank">Mingyang Zhang</a>, 
    <a href="https://web.xidian.edu.cn/mggong/" target="_blank">Maoguo Gong</a>&dagger;
</i><br>
      Historically, infrared adversarial attacks were single-use and tough to deploy. Using TEC, we implemented efficient attacks adaptable to hardware scenarios.
      <br>
      <b><i style="color:#83a1c7;">AAAI 2025</i></b>
      <br>
      <a href="https://ojs.aaai.org/index.php/AAAI/article/view/34011"><em>[paper]</em></a>
    </div>
</div>

Projects
--------
<div class="publication-card featured">
<div style="display: flex; align-items: center;">
    <img src="images/MetaPalace.png" alt="MetaPalace" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>MetaPalace: Let you in a meta world of The Palace Museum</strong><br>
We've done what the Old Palace official website couldn't: offering 3D artifact views with single-view reconstruction and an interactive LLM-powered tour guider using RAG technology. <br>
      <a href="https://metapalace.xj63.fun/"><em>[website]</em></a> 
      <a href="https://github.com/xj63/MetaPalaceSite"><em>[front-end code]</em></a>
      <a href="https://github.com/Selen-Suyue/MetaPalace"><em>[back-end code]</em></a>
    </div>
</div>
</div>
<div style="display: flex; align-items: center;">
    <img src="images/U_pre_pipeline.png" alt="U_pre" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>U-pre: U-Net is an excellent learner for time series forecasting</strong><br>
Time series forecasting is suited for U-Net's architecture due to its consistent input-output distributions and strong mathematical alignment. Combining U-Net with Bert-Encoder improved performance by incorporating both local and global attention. <br>
      <a href="https://github.com/Selen-Suyue/U-pre"><em>[code]</em></a> 
      <a href="files/upre.pdf"><em>[report-cn]</em></a>
    </div>
</div>
<br>
<div style="display: flex; align-items: center;">
    <img src="images/mpre.png" alt="M_pre" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>M-pre: Mamba for time series forecasting</strong><br>
We tried Mamba for time series forecasting based on feature-conditioned tokens, which outpreformed transformer-based U-pre. <br>
      <a href="https://github.com/Selen-Suyue/M-pre"><em>[code]</em></a> 
      <a href="https://github.com/Selen-Suyue/M-pre/raw/main/M_pre.pdf"><em>[report-cn]</em></a>
    </div>
</div>
<div class="publication-card featured">
<div style="display: flex; align-items: center;">
    <img src="images/UniGen.png" alt="UniGen" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>UniGen: Unified understanding and generation based on Flicker 8k dataset</strong><br>
A light-weight model for joint learning of language and image based on tiny captioned image dataset. UniGen is equipped
with the abilities of image genration and language description in one model.<br>
      <a href="https://github.com/Selen-Suyue/UniGen"><em>[code]</em></a>
    </div>
</div>
</div>
<div style="display: flex; align-items: center;">
    <img src="images/crosstalk.png" alt="crosstalk" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>AgentCrossTalk: Performe a Crsosstalk between two LLM agents</strong><br>
      This project uses the Google Gemini to create a simple chatbot application simulating two 
      crosstalk performers performing based on user-provided topics.
<br>
      <a href="https://github.com/Selen-Suyue/Agent_CrossTalk"><em>[code]</em></a> 
      <a href="https://lyn-siya.github.io/AgentCrosstalk/"><em>[website]</em></a>
    </div>
</div>
<br>
<div style="display: flex; align-items: center;">
    <img src="images/FGSM3D.png" alt="FGSM3D" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>FGSM3D: Is the point cloud gradient perturbation attack feasible?</strong><br>
      We tried to extend FGSM to the 3D field and achieved significant success within a certain gradient range, but the sampling method of 3D models tells us that things seem to be not that simple...
<br>
      <a href="https://github.com/Selen-Suyue/FGSM3D"><em>[code]</em></a> 
      <a href="https://github.com/Selen-Suyue/FGSM3D/raw/main/report.pdf"><em>[report-cn]</em></a>
    </div>
</div>
<br>
<div style="display: flex; align-items: center;">
    <img src="images/acoflow.png" alt="acoflow" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>AcoFlow: Heuristic Search for Maximum Flow Problem</strong><br>
      The problem of finding the maximum flow lies in how to design better heuristic information to find the augmenting path. We boldly challenge this problem through the ant colony algorithm.
<br>
      <a href="https://github.com/Selen-Suyue/ML-Homework/blob/main/Max_flow"><em>[code]</em></a> 
      <a href="files/AcoFlow.pdf"><em>[report-cn]</em></a>
    </div>
</div>

Awards
---------------
- *First Prize, Provincial Level, 2023 China Mathematical Contest in Modeling. [code](https://github.com/Selen-Suyue/CUMCM2023)*
- *First Prize, Provincial Level, 2024 China Mathematical Contest in Modeling. [code](https://github.com/Selen-Suyue/CUMCM2024), [paper](https://github.com/Selen-Suyue/CUMCM2024/raw/main/example.pdf)*
- *Second Prize, Northwestern, 2024 China Computer Design Contest. [code](https://github.com/Selen-Suyue/Advpull)*





