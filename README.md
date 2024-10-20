리액트로 장바구니 페이지를 만들어보았다 <br>
<img width="500" alt="shopping-cart" src="https://github.com/user-attachments/assets/01840fd1-cc09-43cc-8bfd-533e9d9b61d1">

아직 수정해야 할 부분이 많다...
오늘 배운 점 
1. styled-components을 사용해봄
2. 공통 부모 요소에 state를 끌어올림
3. 상품 수량 입력 필드에서 onChange 이벤트를 사용해 값이 바뀔 때마다 state 변수에 즉시 반영하도록 했다. 그랬더니 입력 중 순간적으로 발생하는 빈 값이 state 변수에 반영되어 화면에 'NaN원'이라고 표시되는 문제가 발생했다. 그래서 사용자가 입력을 끝내고 입력 필드가 포커스를 벗어났을 때 값을 state 변수에 업데이트하도록 onBlur 이벤트 핸들러를 사용했다. 그러나 onBlur만 사용하면 input의 value porop을 사용할 수 없다. 그래서 useRef를 통해 input 요소의 값을 참조하고, 이를 state에 반영하는 방식으로 문제를 해결했다.