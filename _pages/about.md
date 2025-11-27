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
        border-radius: 8px;
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 20px; 
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .publication-card:hover {
       
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .publication-card.featured {
        border-color: #f5bba7;       /* 更浅的哈密瓜色边框 */
        background: #fef5f1;         /* 非常浅的哈密瓜色背景 */
        box-shadow: 0 4px 8px rgba(242, 166, 120, 0.2); /* 更柔和的初始阴影 */
        z-index: 10;
    }

    .publication-card.featured:hover {
        box-shadow: 0 8px 16px rgba(242, 166, 120, 0.4); 
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

I am an undergraduate (2022-2026) at Xidian University, focusing on Computer Vision and Robot Learning.

I work at [MMLab@HKU](https://mmlab.hk/) with [Prof. Xihui Liu](https://xh-liu.github.io/).
Previously I worked at [MVIG@SJTU](https://www.mvig.org/index.html) with [Prof. Lixin Yang](https://lixiny.github.io/) and [Prof. Cewu Lu](https://www.mvig.org/index.html).

Currently I conduct the VLA research at [ByteDance Seed](https://seed.bytedance.com/en/).

News
---------------
- *[Dense Policy](https://selen-suyue.github.io/DspNet) is accepted in ICCV 2025 &#128293;*
- *[MBA](https://selen-suyue.github.io/MBApage) is accepted in IEEE RA-L 2025 &#128293;*
- *Our work [Advdisplay]() was accepted at AAAI 2025 &#128293;*
- *In charge of [Microsoft Club](https://github.com/MSC-XDU). Feel free to reach out if you'd like to join.*

Experience
--------------
<div class="experience-container">
  <div class="experience-card">
      <img src="images/bytedance.png" alt="Seed logo" class="experience-logo">
      <div class="experience-info">
          <strong>ByteDance Seed</strong><br>
          Oct 2025 - Now<br>
          MLE Intern at <a href="https://seed.bytedance.com/en/"><em>Seed-Robotics</em></a> 
      </div>
  </div>

  <div class="experience-card">
      <img src="images/HKU.png" alt="HKU logo" class="experience-logo">
      <div class="experience-info">
          <strong>The University of Hong Kong</strong><br>
          June 2025 - Now<br>
          Research Intern at <a href="https://mmlab.hk/"><em>MMLab@HKU</em></a> 
      </div>
  </div>

  <div class="experience-card">
      <img src="images/astri.png" alt="astri logo" class="experience-logo">
      <div class="experience-info">
          <strong>Astribot Inc.</strong><br>
          June 2025 - Sep 2025<br>
          MLE Intern advised by <a href="https://scholar.google.com/citations?user=mt5mvZ8AAAAJ&hl=en"><em>Jianan Wang</em></a>
      </div>
  </div>

  <div class="experience-card">
      <img src="images/SJTU.png" alt="SJTU logo" class="experience-logo">
      <div class="experience-info">
          <strong>Shanghai Jiao Tong University</strong><br>
          July 2024 - June 2025<br>
          Research Intern at <a href="https://www.mvig.org/index.html"><em>MVIG</em></a> Lab
      </div>
  </div>

  <div class="experience-card">
      <img src="images/XDU.png" alt="Xi'dian logo" class="experience-logo">
      <div class="experience-info">
          <strong>Xidian University</strong><br>
          Sep 2022 - July 2026<br>
          Rank 4/174, <b>National Scholarship</b><br>
          B.E at <a href="https://sai.xidian.edu.cn"><em>SAI</em></a> & RA at <a href="https://web.xidian.edu.cn/mggong/"><em>OMEGA</em></a> Lab
      </div>
  </div>
</div>

Publications
--------------
<div class="publication-card featured">
  <div style="display: flex; align-items: center;">
    <video width="200" height="120" style="margin-right: 20px; border-radius: 8px;" autoplay loop muted playsinline>
      <source src="https://github.com/Selen-Suyue/DSPv2Net/raw/main/video/videoshow.mp4" type="video/mp4">
    </video>
    <div>
        <strong>DSPv2: Improved Dense Policy for Effective and Generalizable Whole-body Mobile Manipulation</strong><br>
        <i style="font-size: 13px;">
            <a href="https://selen-suyue.github.io" target="_blank"><strong>Yue Su</strong></a>, 
            <a href="https://lin-shan.com/" target="_blank">Chubin Zhang</a>, 
            <a href="https://ch3cook-fdu.github.io/" target="_blank">Sijin Chen</a>,
            <a href="" target="_blank">Liufan Tan</a>, <br>
            <a href="https://andytang15.github.io/" target="_blank">Yansong Tang</a>,
            <a href="https://scholar.google.com/citations?user=mt5mvZ8AAAAJ&hl=en" target="_blank">Jianan Wang</a>,
            <a href="https://xh-liu.github.io/" target="_blank">Xihui Liu</a>&dagger;
        </i><br>
        Improved Dense Policy for Whole-body Mobile Manipulation, with effective perception, generalizable manipulation and coherent actions.
        <br>
        <b><i style="color:#83a1c7;">ArXiv Preprint &nbsp;</i></b>
        <a href="https://arxiv.org/abs/2509.16063"><em>[arXiv]</em></a>
        <a href="https://github.com/Selen-Suyue/DSPv2"><em>[code]</em></a>
        <a href="https://selen-suyue.github.io/DSPv2Net/"><em>[website]</em></a>
    </div>
  </div>
</div>

<div class="publication-card featured">
 <div style="display: flex; align-items: center;">
    <video width="200" height="120" style="margin-right: 20px; border-radius: 8px;" autoplay loop muted playsinline>
      <source src="images/flower_dsp.mp4" type="video/mp4">
    </video>
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
        <b><i style="color:#83a1c7;">ICCV 2025 &nbsp;</i></b>
        <a href="https://openaccess.thecvf.com/content/ICCV2025/html/Su_Dense_Policy_Bidirectional_Autoregressive_Learning_of_Actions_ICCV_2025_paper.html"><em>[paper]</em></a>
        <a href="https://arxiv.org/abs/2503.13217"><em>[arXiv]</em></a>
        <a href="https://selen-suyue.github.io/DspNet/"><em>[website]</em></a>
        <a href="https://github.com/Selen-Suyue/DensePolicy"><em>[3D-code]</em></a>
        <a href="https://github.com/Selen-Suyue/DensePolicy2D"><em>[2D-code]</em></a>
    </div>
</div>
</div>

<div class="publication-card featured">
 <div style="display: flex; align-items: center;">
    <img src="images/mba_animation.gif" alt="MBA" width="200" height="100" style="margin-right: 20px;">
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
      <b><i style="color:#83a1c7;">RA-L 2025, ICRA 2026 &nbsp;</i></b>
        <a href="https://ieeexplore.ieee.org/abstract/document/11027642"><em>[paper]</em></a>
        <a href="https://arxiv.org/abs/2411.09658"><em>[arxiv]</em></a> 
        <a href="https://selen-suyue.github.io/MBApage"><em>[website]</em></a>
        <a href="https://github.com/Selen-Suyue/MBA"><em>[code]</em></a>
    </div>
</div>
</div>

<div class="publication-card">
    <img src="images/GAP.png" alt="RIaa" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>Generative Adversarial Patches for Physical Attacks on Cross-Modal Pedestrian Re-Identification</strong><br>
       <i style="font-size: 13px;">
    <a href="https://selen-suyue.github.io" target="_blank"><strong>Yue Su</strong></a>, 
    <a href="https://scholar.google.com/citations?user=JkQmO-kAAAAJ&hl=en" target="_blank">Hao Li</a>&dagger;, 
    <a href="https://web.xidian.edu.cn/mggong/" target="_blank">Maoguo Gong</a>&dagger;
    </i><br>
    A generative physical adversarial attack on VI-ReID models perturbs modality-invariant features. <br>
    <b><i style="color:#83a1c7;">ArXiv Preprint &nbsp;</i></b>
      <a href="https://arxiv.org/abs/2410.20097"><em>[arxiv]</em></a>
    </div>
</div>

<div class="publication-card">
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
      <b><i style="color:#83a1c7;">AAAI 2025 &nbsp;</i></b>
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

<div class="publication-card">
    <img src="images/U_pre_pipeline.png" alt="U_pre" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>U-pre: U-Net is an excellent learner for time series forecasting</strong><br>
Time series forecasting is suited for U-Net's architecture due to its consistent input-output distributions and strong mathematical alignment. Combining U-Net with Bert-Encoder improved performance by incorporating both local and global attention. <br>
      <a href="https://github.com/Selen-Suyue/U-pre"><em>[code]</em></a> 
      <a href="files/upre.pdf"><em>[report-cn]</em></a>
    </div>
</div>

<div class="publication-card">
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

<div class="publication-card">
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

<div class="publication-card featured">
<div style="display: flex; align-items: center;">
    <img src="images/dobot.png" alt="dobot" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>OpenDoBot: Generalizable visual-motor policy on Dobot Robot</strong><br>
       We develop Imitation Learning policy and multi stage detection based policy on DoBot Robot, which has been proved 
       to preform well on combinatorial problems.<br>
      <a href="https://www.dobot-robots.com/"><em>[DoBot Robot]</em></a> 
      <a href="https://github.com/Selen-Suyue/OpenDoBot"><em>[IL policy code]</em></a>
      <a href="https://github.com/Selen-Suyue/ms-bot"><em>[multi stage code]</em></a>
    </div>
</div>
</div>

<div class="publication-card">
    <img src="images/FGSM3D.png" alt="FGSM3D" width="200" height="100" style="margin-right: 20px;">
    <div>
        <strong>FGSM3D: Is the point cloud gradient perturbation attack feasible?</strong><br>
      We tried to extend FGSM to the 3D field and achieved significant success within a certain gradient range, but the sampling method of 3D models tells us that things seem to be not that simple...
<br>
      <a href="https://github.com/Selen-Suyue/FGSM3D"><em>[code]</em></a> 
      <a href="https://github.com/Selen-Suyue/FGSM3D/raw/main/report.pdf"><em>[report-cn]</em></a>
    </div>
</div>

Awards
--------
- Xiaomi Outstanding Scholarship 2025
- National Scholarship 2025
- Outstanding Student, Xidian University, 2025

Talks
--------
- [2025/10] Invited to [Talk on 3D视觉工坊](https://b23.tv/PvLKNR1) about DSP and DSPv2;

