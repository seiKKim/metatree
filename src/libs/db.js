import { PrismaClient } from '@prisma/client';

let peisma;

if (process.env.NODE_ENV === 'production') {
    peisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    peisma = global.prisma;
}

export default peisma;

// 1.PrismaClient 임포트: @prisma/client 패키지에서 PrismaClient 클래스를 가져옵니다.

// 2.Prisma 클라이언트 인스턴스 생성: 환경 변수 NODE_ENV에 따라 Prisma 클라이언트 인스턴스를 생성합니다.
// 프로덕션 환경인 경우 새로운 PrismaClient 인스턴스를 생성합니다.
// 개발 환경인 경우 global 객체에 이미 존재하는 prisma 인스턴스를 사용합니다. 이렇게 하면 애플리케이션의 수명 동안 하나의 Prisma 클라이언트 인스턴스를 재사용할 수 있어 성능이 향상됩니다.
// 3.Prisma 클라이언트 내보내기: 생성된 peisma 인스턴스를 기본 내보내기로 내보냅니다. 이를 통해 다른 파일에서 이 Prisma 클라이언트 인스턴스를 사용할 수 있습니다.

// 이 코드 패턴은 다음과 같은 이점을 제공합니다:
// 성능 향상: 개발 환경에서 Prisma 클라이언트 인스턴스를 재사용하면 데이터베이스 연결 생성 및 해제 비용을 줄일 수 있어 성능이 향상됩니다.
// 환경 독립성: 환경 변수 NODE_ENV를 사용하여 프로덕션과 개발 환경을 구분하므로, 환경에 따라 다른 Prisma 클라이언트 인스턴스를 사용할 수 있습니다.
// 코드 재사용성: 이 패턴을 사용하면 Prisma 클라이언트 인스턴스 생성 로직을 한 곳에 집중시킬 수 있어 코드 재사용성이 높아집니다.
// 전반적으로 이 코드는 Prisma 클라이언트를 효율적이고 유연하게 사용할 수 있도록 도와줍니다.

