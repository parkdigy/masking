# 프로젝트 구조와 개발 참고

## 분석 범위

2026-11-02 기준 저장소의 소스, 설정, npm 스크립트를 분석했다. 이 문서는 탐색 안내이며, 실제 코드와 설정이 변경되면 해당 파일을 우선하고 문서도 갱신한다.

이 프로젝트는 개인정보 문자열을 마스킹하는 TypeScript 패키지 `@pdg/masking`이다. 서버, 데이터베이스, UI는 없다. `src/index.ts`는 여섯 개의 명명된 함수와 같은 함수를 속성으로 가진 기본 객체를 내보낸다. 예제는 아직 패키지를 사용하지 않고 콘솔에 문구만 출력한다.

## 파일별 책임

| 경로 | 책임과 수정 시점 |
| --- | --- |
| `src/index.ts` | 번들 진입점. 외부에서 사용할 함수·클래스·타입을 명시적으로 내보낼 위치 |
| `src/masking{Batch,BusinessNo,Email,Name,PersonalNo,TelNo}.ts` | 일괄 처리 및 각 항목의 마스킹 구현 |
| `test/masking*.test.ts` | 공개 함수를 통한 각 마스킹 및 일괄 처리 테스트 |
| `examples/src/example.ts` | 현재 `Hello, World!` 출력. 실제 API 사용 예제가 필요하면 갱신 |
| `examples/package.json` | `tsx` 실행 환경. 루트 패키지 의존성이나 workspace 연결은 현재 없음 |
| `package.json` | 공개 진입점, 배포 파일, 개발·빌드·게시 명령 |
| `rollup.config.js` | JS 두 형식 번들, 타입 선언 생성, 배포용 선언 정리 |
| `tsconfig.json` | `src/` 대상 엄격한 타입 검사와 선언 출력 설정 |
| `tsconfig.test.json` / `jest.config.ts` | ts-jest 변환, Node 테스트 환경 설정 |
| `eslint.config.js` / `.prettierrc.cjs` | 정적 검사와 포맷 기준 |
| `.nvmrc` | Node `24.22.1` 지정 |
| `.gitignore` / `.npmignore` | Git 추적 제외 및 npm 배포 제외 설정. `dist/`는 현재 추적 중 |
| `.git-commit.cjs` / `.git-merge.cjs` | 전체 변경 스테이징·커밋 및 원격 병합 보조 스크립트 |

## 코드에서 배포물까지

```text
src/index.ts
  └─ Rollup + TypeScript
      ├─ dist/index.js       (CommonJS 코드 출력)
      ├─ dist/index.esm.js   (ES module 코드 출력)
      └─ dist/index.d.ts    (공개 타입 선언)

test/*.test.ts ─ ts-jest ─ Node 환경 테스트
examples/src/example.ts ─ tsx ─ 콘솔 예제
```

- `package.json`의 `main`과 `exports.require`는 `dist/index.js`, `module`과 `exports.import`는 `dist/index.esm.js`, `types`와 `exports.types`는 `dist/index.d.ts`를 가리킨다.
- Rollup은 `dependencies`와 `peerDependencies`를 외부 의존성으로 처리하도록 구성돼 있다. 전화번호·사업자등록번호·주민등록번호는 peer dependency인 `@pdg/formatting`을 사용한다. 의존성 변경 시 소비자 설치 책임과 실제 동작을 확인한다.
- 타입 선언은 `dist/`에 생성된다. Rollup의 사용자 플러그인은 `.private`로 끝나는 디렉터리와 `.private.d.ts` 파일을 제거한다. 공개 선언이 삭제 대상 타입을 참조하지 않는지 확인한다. 이는 런타임 코드의 접근 제한 기능이 아니다.
- TypeScript는 ES2017, ESNext 모듈, `strict`, `noImplicitAny`, `verbatimModuleSyntax`를 사용한다. 타입 전용 의존성에는 `import type` / `export type`을 사용한다.
- TypeScript 6의 `moduleResolution: bundler`를 사용하며, 이전 `baseUrl: ./src`를 통한 절대 경로 해석은 사용하지 않는다. 테스트 설정은 Jest와 Node 전역 타입을 명시한다.
- `@rollup/plugin-eslint`의 peer dependency 때문에 ESLint와 `@eslint/js`는 9.x를 사용한다. ESLint 9는 지원이 종료됐으므로 플러그인의 ESLint 10 지원 여부를 확인해 함께 갱신해야 한다. TypeScript는 `ts-jest`와 `typescript-eslint`의 지원 범위에 맞춰 6.x를 사용한다.
- 루트 타입 검사는 `src/`만 대상으로 한다. 예제와 테스트의 전체 검증을 대신하지 않는다.
- `npm run lint`는 `src/**/*.ts`만 검사한다. Rollup은 경고에도 실패하도록 설정돼 있으므로 lint 명령 성공만으로 번들 성공을 보장하지 않는다.

## 명령 안내

루트 기준이다. 설치된 의존성이 있어야 개발 명령을 실행할 수 있다.

| 목적 | 명령 | 주의점 |
| --- | --- | --- |
| 의존성 설치 | `npm install` | 잠금 파일은 현재 Git 제외 대상 |
| 타입 검사 | `npm run tsc` | `tsc --noEmit`, `src/` 대상 |
| 소스 정적 검사 | `npm run lint` | 테스트·예제는 검사 범위 밖 |
| 테스트 | `npm test -- --runInBand --watchman=false` | Watchman 없이 단일 프로세스로 실행 |
| 표준 빌드 | `npm run build` | Watchman 재등록과 기본 Jest 실행 포함 |
| 번들만 확인 | `./node_modules/.bin/rollup -c --bundleConfigAsCjs` | 테스트를 별도로 실행해야 함. `dist/*` 정리 후 생성 |
| 예제 실행 | `npm run dev` | `examples/` 의존성 별도 설치 필요. 현재 단발 실행이며 감시 모드 아님 |
| 배포 파일 확인 | `npm pack --dry-run` | 게시하지 않고 포함 목록 확인 |

`npm run pub`는 설치·빌드·공개 npm 게시를 수행한다. 마지막의 `|| true` 때문에 종료 코드만으로 게시 성공을 판단하면 안 된다. `git:commit`은 `git add .`를 실행하고, `reset:gitignore`는 전체 인덱스를 재구성하며, `reinstall:module`은 의존성과 잠금 파일을 삭제한다. 일반 검증 명령으로 사용하지 않는다.

## 배포·설정 변경 시 확인할 사항

1. **모듈 형식:** 패키지에 `"type": "module"`이 있는데 CommonJS 출력 경로가 `.js`이다. Node에서 해당 파일은 ESM으로 해석되므로 `require` 진입점 호환성을 보장할 수 없다. 기능 구현과 별개인 기존 설정 문제로 기록하며, 모듈 설정을 변경하거나 게시할 때 실제 패키지를 소비하는 `import` / `require` 검증을 수행한다.
2. **실행 환경:** Rollup의 `context: 'window'`는 브라우저 API 지원을 보장하지 않는다. 현재 테스트는 Node 환경이고 TypeScript `lib`는 ES2017이다. 브라우저 전용 기능을 추가하려면 지원 환경부터 정한다.
3. **배포 범위:** `files`는 `dist`, `README.md`를 지정한다. 진입점 파일 존재와 선언 파일 누락 여부는 `npm pack --dry-run`으로 확인한다. 에이전트 문서와 작업 기록을 배포물에 포함할 이유는 없다.
4. **예제 연결:** 예제에는 루트 패키지 의존성이 선언돼 있지 않다. 소스 직접 호출과 설치 패키지 소비 검증을 구분한다. 공개 진입점 검증이 목적이면 빌드된 패키지를 실제로 설치한 소비 환경이 필요하다.
5. **생성 파일:** `dist/`는 Git에서 추적 중이다. Rollup은 `dist/*`를 정리하고 다시 생성하므로 실행 전후 변경 사항을 확인하고 기존 변경을 보존한다. 생성물을 직접 편집하지 않는다.

## 공개 API와 동작 확인점

- 명명된 내보내기는 `maskingBatch`, `maskingBusinessNo`, `maskingEmail`, `maskingName`, `maskingPersonalNo`, `maskingTelNo`다. 기본 내보내기 객체는 각각 `batch`, `businessNo`, `email`, `name`, `personalNo`, `telNo` 속성으로 제공한다.
- 번호 마스킹 함수의 두 번째 인자 `formatting`은 기본값이 `true`다. `false`이면 서식 구분자 없이 반환한다. 실제 구분과 처리 결과는 `@pdg/formatting` 및 입력에 의존한다.
- `maskingBatch`는 최상위 객체를 얕게 복사하고 유형별로 지정한 단일 키 또는 키 배열의 값 중 비어 있지 않은 문자열만 마스킹한다. 중첩 객체를 재귀적으로 처리하지 않으며, 같은 키를 여러 유형에 지정하면 코드 순서대로 처리한다.
- 기존 테스트는 각 함수의 대표적인 입력과 출력 및 일괄 처리를 확인한다. 모든 잘못된 입력이나 개인정보 비노출을 보장하는 검증은 아니므로 변경 시 경계값과 오류 동작을 별도로 살펴본다.
- `dist/`는 소스와 별도로 추적되므로 현재 내용이 최신 소스와 일치한다고 가정하지 않는다. 배포 변경 시 빌드 결과와 실제 설치 소비자를 확인한다.
