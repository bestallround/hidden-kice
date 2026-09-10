# Hidden Kice Store

히든카이스 스토어 메인 화면을 Next.js로 재현한 면접 과제입니다.

**데모:** [https://hidden-kice-nu.vercel.app/store](https://hidden-kice-nu.vercel.app/store)

## 실행 방법

```bash
npm install
```

프로젝트 루트에 `.env.local`을 만들고 아래 값을 채웁니다.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 `/store`로 이동합니다.

## 기술 스택

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Supabase (`@supabase/supabase-js`)
- TanStack Query

## 구조

URL마다 `app/` 아래 `page.tsx`를 두고, 스토어 화면·데이터는 `features/store`에, 헤더·푸터는 `components/layout`에 나눴습니다. 화면이 늘어나면 라우트는 `app`에, 기능은 `features`에 추가하면 됩니다.

```text
src/
├── app/                    # 라우트만
│   ├── page.tsx            # / → /store
│   └── store/
│       ├── page.tsx        # 스토어 목록
│       └── [id]/page.tsx   # 상품 상세
├── components/layout/      # 헤더, 푸터
├── features/store/         # 스토어 화면 · 데이터
│   ├── api/                # Supabase 쿼리
│   ├── hooks/              # React Query
│   └── components/
└── lib/supabase/           # 브라우저 클라이언트
```

- **상품 목록**은 서버 상태라 CSR + React Query로 가져옵니다. 검색·`전체 | 패스 | 단품` 필터는 화면 상태라 쿼리와 분리했습니다.
- Zustand는 쓰지 않았습니다. 여러 화면이 공유할 클라이언트 전역 상태가 아직 없기 때문입니다.
- 상품 이미지는 Supabase Storage URL을 DB에 저장하고, 히어로·아이콘처럼 고정된 UI 자산은 `public/`에 둡니다.

## 범위

- 스토어 메인 (히어로, 검색·필터, 상품 그리드)
- 상품 상세 플레이스홀더 (`/store/[id]`)
- 헤더 메뉴 이동 (`/ai-omr-work`, `/challenge`, `/about`)
- 2열 그리드 구간에서 헤더 축소 + 햄버거 드로어


