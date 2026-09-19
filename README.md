# CSP Lab Website

정적 HTML/CSS/JS로 만든 연구실 홈페이지입니다. 별도 빌드 과정 없이 바로
GitHub Pages 등에 호스팅할 수 있습니다.

## 구조

```
index.html          홈
research.html        연구분야
people.html          구성원 (지도교수/대학원생/졸업생)
publications.html    논문 목록
news.html            소식/공지
contact.html         연락처 / 오시는 길
css/style.css        전체 스타일 (라이트/다크 모드 자동 대응)
js/main.js           공통 헤더/푸터 렌더링 + 모바일 메뉴 토글
assets/images/       로고, 구성원 사진 등
```

모든 페이지는 `js/main.js`가 `#site-header` / `#site-footer` 안에 내비게이션과
푸터를 자동으로 채워 넣습니다. 새 페이지를 추가할 때는 `NAV_LINKS` 배열
(`js/main.js`)에 항목을 추가하고, `<body data-page="...">` 값을 맞춰주면
해당 메뉴가 활성화 표시됩니다.

## 로컬에서 미리보기

빌드 도구가 없으므로 아무 정적 서버로 열면 됩니다.

```bash
python3 -m http.server 8000
# http://localhost:8000 접속
```

## 콘텐츠 채우기 (기존 www.kucsp.com 마이그레이션)

이 저장소를 만든 세션은 네트워크 정책상 `www.kucsp.com`에 접근할 수
없어서, 각 페이지에 `[대괄호로 표시된 placeholder]`만 채워 넣었습니다.
로컬 환경(네트워크 제한이 없는 곳)에서 Claude Code를 실행해 아래 프롬프트로
기존 사이트 내용을 크롤링해 채워 넣으세요.

### 로컬 Claude Code용 마이그레이션 프롬프트

```
https://www.kucsp.com/ 사이트의 모든 페이지(네비게이션 메뉴에 있는 하위
페이지 포함)를 크롤링해서, 현재 이 저장소의 정적 사이트
(index.html, research.html, people.html, publications.html, news.html,
contact.html)에 있는 [대괄호] placeholder 텍스트를 실제 콘텐츠로
교체해줘.

- 구성원 사진 등 이미지는 다운로드해서 assets/images/members/,
  assets/images/ 아래에 저장하고 상대경로로 연결해줘.
- 논문 목록은 연도별로 publications.html의 구조(.pub-year, .pub-list)를
  유지하면서 항목을 필요한 만큼 복제해서 채워줘.
- 구성원은 people.html의 카드 구조를 복제해서 실제 인원 수만큼 만들어줘.
- 소식/공지는 news.html에 최신순으로 정리해줘.
- 로고가 있다면 assets/images/logo.svg를 실제 로고로 교체해줘 (SVG가
  없으면 PNG로 저장하고 js/main.js의 경로를 갱신).
- 작업이 끝나면 python3 -m http.server로 로컬에서 렌더링을 확인하고,
  깨진 링크/이미지가 없는지 점검해줘.
- 완료되면 브랜치 claude/graduate-lab-website-migration-umjmcy 에 커밋하고
  푸시해줘.
```

크롤링 결과가 사이트 구조와 맞지 않는 페이지(예: 프로젝트/수업 안내 등)가
있다면 새 HTML 페이지를 추가하고 `js/main.js`의 `NAV_LINKS`에 등록하면
됩니다.
