# 모뷰

<aside>
👉 영화를 좋아하는 사람을 위한 앱입니다.                                                                                 사용자가 영화에 좋아요/싫어요 를 남길 수 있는데 사용자의 랭크마다 영화에 반영되는 비율이 다릅니다. 사용자의 랭크는 영화에 남긴 리뷰의 좋아요 수를 통해 반영됩니다. 영화에 일부러 안 좋은 평가를 남기는 유저를 위한 규칙도 추가되어있습니다.                                 추가로 영화에도 랭크가 존재하는데 이 랭크는 기존의 영화 평점 사이트의 평점을 BASE 점수로 하고 해당 앱을 사용하는 유저의 평가와 합산하여 랭크가 변동됩니다. 랭크가 해당 랭크의 상한선에 도달하면 승급전을 진행하고, 하한선에 도달하면 강등전을 진행합니다.

</aside>

**목차**

# 앱 설계

---

### 데모 스케치

스케치는 하나의 주제를 정해놓고 생각나는대로 태블릿에 마인드맵 형식으로 그렸습니다. 

해당 스케치 파일을 캡쳐해서 임베딩 시키려 했으나, 사이즈가 크기도 하고, 잘 보이지 않아서 링크를 남깁니다. 

해당 링크를 통해서 스케치를 보고 싶다면, podcrafts 라는 어플을 다운 받아서 확인하는 방법밖에 없습니다. 

prodrafts://note/?uuid=695B69B4-3FC5-4C0A-9677-2A87F9253EBF

### 데이터 스키마

- [https://drive.google.com/file/d/1z-CN9dNNFV1IgzZo4aJqkhrjkRh-riwN/view?usp=sharing](https://drive.google.com/file/d/1z-CN9dNNFV1IgzZo4aJqkhrjkRh-riwN/view?usp=sharing)
    

    

<img width="60%" src="https://user-images.githubusercontent.com/46443443/215486562-0f465384-e233-495c-b0fe-3a630b121f24.png"/>

- 수정 내역
    - 2023-01-14
        - actor, director, movie, movie_info, category, user, review, ott ENTITY 생성
    - 2023-01-30
        - USER/MOVIE/REVIEW 를 데이터베이스로 잡고, MOVIE 컬렉션에는 연관된 정보들을 분리해서 서브컬렉션으로 만들었음 
        - actor, director, info, platform 

### API 설계

API 설계를 excel, notion을 이용할 생각해봤는데. 만약 협업시 변경사항을 다른사람과 공유하기 불편하기도 하므로 다른 툴을 사용하고자 했다. 

python-fastapi 프레임워크를 사용한다면, swagger 자동으로 지원되므로 편하겠지만, 해당 프로젝트에서는 js로 백엔드를 구성하고자 하므로 따로 swagger 코드를 작성하는게 불편해서 다른 툴을 찾아봤다. 

gitbook, insomnia, postman을 써봤는데, 가장 직관적인 ui를 사용함과 동시에 테스트도 진행할 수 있어서 postman을 사용하기로 했다. 

### 아키텍쳐 설계

이번 프로젝트에서는 MSA( MicroService Architecture) 로 프로젝트를 구성하고자 한다. 

기존의 monolith architecture의 한계점으로는 앱이 스케일링 될 때 하나의 설정값을 바꾸면 여러 모듈이 연쇄적으로 반응할 수 있어서 스케일링에 조심스럽다. 그렇다고 당장에 돌아가는 코드만 짜놓을 경우 나중에 더 힘들어질 수 있기 때문이다. 

[Monolithic Architecture]

<img width="60%" src="https://user-images.githubusercontent.com/46443443/214330685-a1484c21-0466-4eaa-b031-de9d738f2c97.png"/>

[MSA]

<img width="60%" src="https://user-images.githubusercontent.com/46443443/214330502-f5fd890e-5b4f-448d-aa98-27b589f1684a.png"/>


추가로 서비스간에 비동기 통신으로 작업하기 위해서 RabbitMQ를 사용하려고 한다. 서비스 사이를 direct로 연결시켜 놓게 되면 하나의 서비스가 다운이 되었을 때 다른 서비스의 요청을 못 받게 되므로 production level에서 문제가 생길 수 있기 때문이다. Kafka를 사용하지 않고 RabbitMQ를 사용한 이유는 상대적으로 Rabbit MQ가 소규모 어플리케이션에 어울린다고 생각했다. 

### 배포

배포는 다음과 같이 하고자 한다. 

각각의 서비스를 도커화 시키고, Elastic Beanstalk 으로 배포를 하려고 한다. 

왜 ECS, EKS를 사용하지 않으냐면, AWS 공식 문서에서 설명하기를 소규모 어플리케이션에서 Elatic Beanstalk으로 배포하다가 서비스 많아지고 배포에 있어서 세밀한 조정이 필요한 경우 ECS나 EKS를 사용하기를 권장하고 있기 때문이다. 

### 테스트

추가적으로, CI/CI를 위해서 github action을 사용하고자 한다. 

### DevOps

추가적으로, CI/CI를 위해서 github action을 사용하고자 한다. 

# 1. Use

---

### 👨‍👩‍👧‍👦 인사 OKR 업데이트

- OKR 업데이트
- 직원 만족도, 신규 입사 직원 등 공유

![%E1%84%86%E1%85%A9%E1%84%87%E1%85%B2%20f8dd91636989431fb6a09847399e9e9b/Pie_Circular.png](%E1%84%86%E1%85%A9%E1%84%87%E1%85%B2%20f8dd91636989431fb6a09847399e9e9b/Pie_Circular.png)

![%E1%84%86%E1%85%A9%E1%84%87%E1%85%B2%20f8dd91636989431fb6a09847399e9e9b/Pie_Classic.png](%E1%84%86%E1%85%A9%E1%84%87%E1%85%B2%20f8dd91636989431fb6a09847399e9e9b/Pie_Classic.png)

# 프로덕트

---

### ⚙️ 프로덕트 OKR 업데이트

- OKR 업데이트
- 쿼리 타임 정보 공유

![%E1%84%86%E1%85%A9%E1%84%87%E1%85%B2%20f8dd91636989431fb6a09847399e9e9b/Line_Chart_2.png](%E1%84%86%E1%85%A9%E1%84%87%E1%85%B2%20f8dd91636989431fb6a09847399e9e9b/Line_Chart_2.png)

![%E1%84%86%E1%85%A9%E1%84%87%E1%85%B2%20f8dd91636989431fb6a09847399e9e9b/Line_Chart_2%201.png](%E1%84%86%E1%85%A9%E1%84%87%E1%85%B2%20f8dd91636989431fb6a09847399e9e9b/Line_Chart_2%201.png)

![%E1%84%86%E1%85%A9%E1%84%87%E1%85%B2%20f8dd91636989431fb6a09847399e9e9b/Histogram_1.png](%E1%84%86%E1%85%A9%E1%84%87%E1%85%B2%20f8dd91636989431fb6a09847399e9e9b/Histogram_1.png)

### ✨ 랜딩 페이지 업데이트

- 데스크톱 랜딩 페이지

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F0jL00AqopESfBQew6RtXwe%2FLanding-Page%3Fnode-id%3D0%253A1](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F0jL00AqopESfBQew6RtXwe%2FLanding-Page%3Fnode-id%3D0%253A1)

- 모바일 랜딩 페이지
    
    [https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FEvQeK2z1aKGsJVWk4jN8Ch%2FMobile-Landing-Page%3Fnode-id%3D0%253A1](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FEvQeK2z1aKGsJVWk4jN8Ch%2FMobile-Landing-Page%3Fnode-id%3D0%253A1)
    

# 비즈니스 & 고객

---

### 💼 비즈니스 **OKR 업데이트**

- OKR 업데이트
- 아이디어 워크플로
    
    [https://miro.com/app/board/o9J_lv67NFg=/](https://miro.com/app/board/o9J_lv67NFg=/)
    

### 🌱 비영리 프로그램

비영리 프로그램을 성공적으로 론칭했습니다. 아래 페이지에서 세부 정보를 확인하고, 참여를 원할 경우 알려주세요 😁

[비영리 프로젝트 론칭](https://www.notion.so/aac009b7d7be4ae9959402ef3dc69682)

# Q&A

### 📮 Q&A 노트

- **오픈마이크 (5분)**
    - 비영리 프로그램 기여 방안
        - 세부 내용은 [sohrab.amin@makenotion.com](mailto:sohrab.amin@makenotion.com) 으로 문의

---

# 녹화본 링크

회의에 참여하지 못한 직원들도 나중에 영상을 확인할 수 있도록 녹화본 링크를 추가해 주세요.

<aside>
👉 [**‘22 전사회의 녹화본 →** https://zoom.us/u/123456789](https://zoom.us/u/123456789)

</aside>