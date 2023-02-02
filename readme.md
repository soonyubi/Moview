# 모뷰

<aside>
👉 영화를 좋아하는 사람을 위한 앱입니다. 
유저는 고유의 랭크를 가지고 있습니다. (demo : 이 시대의 평론가 - 방구석 평론가 - 뉴비 - 좟문가) 
유저는 영화에 좋아요/ 싫어요를 남길 수 있고, 영화에 반영되는 정도는 유저의 랭크에 따라 다릅니다. 
유저는 리뷰를 남길 수 있는데 리뷰는 유저의 랭크에 반영되는 좋은 결과물이고, 또한 영화에도 싫어요 좋아요와 다르게 세부적으로 반영됩니다. 
영화도 고유의 랭크를 가지고 있습니다. (demo : 명작 - 킬링타임 - 아... 시간아까워 )
각 랭크에서 상한선에 도달하면 승급전을 하한선에 도달하면 강등전을 진행합니다. 
영화 인기순으로 정렬시켰을 때 한 사람이 좋아요만 눌렀을 경우 그 영화가 가장 상단에 배치되는 것이 다른 어플의 단점이었습니다. 
해당 어플은 여러 영화 평점 사이트들의 평점을 조화해서 base 점수로 하고, 나머지 점수는 해당 어플을 이용하는 유저의 점수로 영화의 랭크가 반영되므로 더욱 객관적인 결과를 얻을 수 있습니다. 
</aside>

**목차**

# 앱 설계

---

## 데모 스케치

스케치는 하나의 주제를 정해놓고 생각나는대로 태블릿에 마인드맵 형식으로 그렸습니다. 

해당 스케치 파일을 캡쳐해서 임베딩 시키려 했으나, 사이즈가 크기도 하고, 잘 보이지 않아서 링크를 남깁니다. 

해당 링크를 통해서 스케치를 보고 싶다면, podcrafts 라는 어플을 다운 받아서 확인하는 방법밖에 없습니다. 

prodrafts://note/?uuid=695B69B4-3FC5-4C0A-9677-2A87F9253EBF

## 데이터 스키마

- [https://drive.google.com/file/d/1z-CN9dNNFV1IgzZo4aJqkhrjkRh-riwN/view?usp=sharing](https://drive.google.com/file/d/1z-CN9dNNFV1IgzZo4aJqkhrjkRh-riwN/view?usp=sharing)
    

    

<img width="60%" src="https://user-images.githubusercontent.com/46443443/215486562-0f465384-e233-495c-b0fe-3a630b121f24.png"/>

- 수정 내역
    - 2023-01-14
        - actor, director, movie, movie_info, category, user, review, ott ENTITY 생성
    - 2023-01-30
        - USER/MOVIE/REVIEW 를 데이터베이스로 잡고, MOVIE 컬렉션에는 연관된 정보들을 분리해서 서브컬렉션으로 만들었음 
        - actor, director, info, platform 

## API 설계

API 설계를 excel, notion을 이용할 생각해봤는데. 만약 협업시 변경사항을 다른사람과 공유하기 불편하기도 하므로 다른 툴을 사용하고자 했습니다. 

python-fastapi 프레임워크를 사용한다면, swagger 자동으로 지원되므로 편하겠지만, 해당 프로젝트에서는 js로 백엔드를 구성하고자 하므로 따로 swagger 코드를 작성하는게 불편해서 다른 툴을 찾아봤습니다. 

gitbook, insomnia, postman을 써봤는데, 가장 직관적인 ui를 사용함과 동시에 테스트도 진행할 수 있어서 postman을 사용하기로 했습니다. 

## 아키텍쳐 설계

이번 프로젝트에서는 MSA( MicroService Architecture) 로 프로젝트를 구성하고자 합니다.

기존의 monolith architecture의 한계점으로는 앱이 스케일링 될 때 하나의 설정값을 바꾸면 여러 모듈이 연쇄적으로 반응할 수 있어서 스케일링에 조심스럽습니다. 그렇다고 당장에 돌아가는 코드만 짜놓을 경우 나중에 더 힘들어질 수 있기 때문입니다. 

[Monolithic Architecture]

<img width="60%" src="https://user-images.githubusercontent.com/46443443/214330685-a1484c21-0466-4eaa-b031-de9d738f2c97.png"/>

[MSA]

<img width="60%" src="https://user-images.githubusercontent.com/46443443/214330502-f5fd890e-5b4f-448d-aa98-27b589f1684a.png"/>


추가로 서비스간에 비동기 통신으로 작업하기 위해서 RabbitMQ를 사용하려고 합니다. 서비스 사이를 direct로 연결시켜 놓게 되면 하나의 서비스가 다운이 되었을 때 다른 서비스의 요청을 못 받게 되므로 production level에서 문제가 생길 수 있기 때문입니다. Kafka를 사용하지 않고 RabbitMQ를 사용한 이유는 상대적으로 Rabbit MQ가 소규모 어플리케이션에 어울린다고 생각했습니다.

비동기 통신을 위한 구조는 다음과 같습니다

<img width="60%" src="https://user-images.githubusercontent.com/46443443/215966367-2ebd69f2-d65b-447b-bc8c-ecbf4fce1a4d.png"/>

- 리뷰 이벤트 
    - 생성,삭제,수정,좋아요,싫어요 등에 대한 이벤트가 발생하면 유저 서비스로 리뷰 데이터를 보냅니다. 리뷰데이터를 받은 유저는 각 이벤트에 해당하는 작업을 합니다. 
- 영화 이벤트
    - 영화 좋아요, 싫어요, 리뷰, 나중에 볼 영화 등 이벤트가 발생하면 유저 서비스로 영화 데이터를 보내고 유저 서비스에서 각 이벤트에 맞는 로직을 수행하게 됩니다. 
- 유저 이벤트 
    - 리뷰 이벤트에서 데이터를 받고 어떤 로직을 수행한 결과를 다시 리뷰이벤트로 보냅니다. 왜냐하면, 리뷰 데이터 베이스에는 유저 정보가 포함되어야 하고 , 유저 데이터 베이스에도 리뷰 정보가 포함되어야 하기 때문입니다. 



<img width="60%" src="https://user-images.githubusercontent.com/46443443/216065556-bce9024f-2755-4cd3-b14d-cc4c3606ca3d.png"/>

각 서비스 당 에러를 수집하도록 구성했습니다. 

<img width="60%" src="https://user-images.githubusercontent.com/46443443/216064898-4b767049-f90d-4b56-8bbf-0c9926983bab.png"/>


## 배포

배포는 다음과 같이 하고자 한다. 

각각의 서비스를 도커화 시키고, Elastic Beanstalk 으로 배포를 하려고 한다. 

왜 ECS, EKS를 사용하지 않으냐면, AWS 공식 문서에서 설명하기를 소규모 어플리케이션에서 Elatic Beanstalk으로 배포하다가 서비스 많아지고 배포에 있어서 세밀한 조정이 필요한 경우 ECS나 EKS를 사용하기를 권장하고 있기 때문이다. 

도커화한 서비스는 nginx-proxy, movie service, user service, review service, mongo 이다. 


## 테스트

추가적으로, CI/CI를 위해서 github action을 사용하고자 한다. 

## DevOps

### 에러 핸들링
에러 로그를 수집하기 위해서 sentry 툴을 사용했습니다. 
sentry를 사용한 이유는 소스 코드의 어느 위치에서 에러가 발생했는지 상세하게 스택을 확인할 수 있기 때문입니다. 
