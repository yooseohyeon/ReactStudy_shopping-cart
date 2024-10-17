리액트로 장바구니 페이지를 만들어보았다 <br>
<img width="500" alt="shopping-cart" src="https://github.com/user-attachments/assets/01840fd1-cc09-43cc-8bfd-533e9d9b61d1">


아직 수정해야 할 부분이 많다...
오늘 배운 점 
1. styled-components을 사용해봄
2. 공통 부모 요소에 state를 끌어올림
3. 리액트는 원래 비동기적으로 state를 업데이트한다. 여러 번의 state 업데이트가 발생하면, 이를 즉각적으로 처리하는 게 아니라 모든 코드 실행이 끝난 뒤 모아서 한꺼번에 처리한다. 그리고 이전 렌더링의 state 값을 기반으로 state 업데이트가 이루어진다. 그래서 동일한 state 변수를 여러 번 업데이트해야 하는 경우, 개발자의 의도와 다르게 동작할 수 있다. 내가 구현한 장바구니 페이지에서는 버튼 클릭을 통해 quantity와 price state 변수의 업데이트가 이루어지는데 여러 번 버튼을 클릭할 경우 동일한 state 변수의 업데이트가 여러 번 이루어질 것이다. 그래서 그떄마다 이전 렌더링의 state 값이 아니라 최신 state 값을 가져오도록 업데이터 함수를 사용했다.
