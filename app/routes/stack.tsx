import { Header } from "~/components/organisms/Header";
import { Footer } from "~/components/organisms/Footer";

export default function StackRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header backgroundImage="/img/van_gogh_wheatfield_with_crows.jpg" />
      <main className="flex-grow mx-auto max-w-[750px] p-4">
        <h4 className="font-gill-sans-bold text-lg mb-2">Languages</h4>
        <div className="flex flex-wrap space-x-1 mb-4">
          <img src="https://img.shields.io/badge/Python-3776AB?style=plastic&logo=python&logoColor=white" alt="Python" />
          <img src="https://img.shields.io/badge/Rust-000?logo=rust&logoColor=fff&style=plastic" alt="Rust" />
          <img src="https://img.shields.io/badge/Go-00ADD8.svg?style=plastic&logo=Go&logoColor=white" alt="Go" />
          <img src="https://img.shields.io/badge/C%2B%2B-00599C?style=plastic&logo=c%2B%2B&logoColor=white" alt="C++" />
          <img src="https://img.shields.io/badge/SQL-000?style=plastic&logo=sql&logoColor=white" alt="SQL" />
          <img src="https://img.shields.io/badge/TypeScript-3178C6?logoColor=white&style=plastic&logo=typescript" alt="TypeScript" />
          <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=white&Color=white&style=plastic" alt="JavaScript" />
          <img src="https://img.shields.io/badge/R-276DC3?logo=r&logoColor=fff&style=plastic" alt="R" />
        </div>

        <h4 className="font-gill-sans-bold text-lg mb-2">Frontend</h4>
        <div className="flex flex-wrap space-x-1 mb-4">
          <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff&style=plastic" alt="HTML5" />
          <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=plastic" alt="CSS3" />
          <img src="https://img.shields.io/badge/Remix-000?logo=remix&logoColor=fff&style=plastic" alt="Remix" />
          <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=plastic" alt="React" />
          <img src="https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=fff&style=plastic" alt="Tailwind" />
          <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=plastic" alt="Vite" />
          <img src="https://img.shields.io/badge/DaisyUI-5A0EF8?logo=daisyui&logoColor=fff&style=plastic" alt="DaisyUI" />
          <img src="https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=fff&style=plastic" alt="Vercel" />
        </div>

        <h4 className="font-gill-sans-bold text-lg mb-2">Backend</h4>
        <div className="flex flex-wrap space-x-1">
          <img src="http://img.shields.io/badge/-<>%20gRPC-00A98F?style=plastic&logo=grpc&logoColor=ffffff" alt="gRPC" />
          <img src="https://img.shields.io/badge/OpenAPI-6BA539.svg?style=plastic&logo=OpenAPI-Initiative&logoColor=white" alt="OpenAPI" />
          <img src="https://img.shields.io/badge/Swagger-%23Clojure?style=plastic&logo=swagger&logoColor=white" alt="Swagger" />
          <img src="https://img.shields.io/badge/Websocket-000?style=plastic&logo=websocket&logoColor=white" alt="Websocket" />
          <img src="https://img.shields.io/badge/Webhook-000?style=plastic&logo=webhook&logoColor=white" alt="Webhook" />
          <img src="https://img.shields.io/badge/AsyncIO-2C5BB4?logo=aiohttp&logoColor=fff&style=plastic" alt="AIOHTTP" />
          <img src="https://img.shields.io/badge/FastAPI-009688.svg?style=plastic&logo=FastAPI&logoColor=white" alt="FastAPI" />
          <img src="https://img.shields.io/badge/Pydantic-E92063.svg?style=plastic&logo=Pydantic&logoColor=white" alt="Pydantic" />
          <img src="https://img.shields.io/badge/-JWT-000000?style=plastic&logo=jsonwebtokens&logoColor=white" alt="JWT" />
          <img src="https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=plastic" alt="Node.js" />
        </div>

        <h4 className="font-gill-sans-bold text-lg mt-2 mb-2">DevOps & MLOps</h4>
        <div className="flex flex-wrap gap-1">
          <img src="https://img.shields.io/badge/OpenTofu-FFDA18?logo=opentofu&logoColor=000&style=plastic" alt="OpenTofu" />
          <img src="https://img.shields.io/badge/-Terraform-623CE4?logoColor=white&style=plastic&logo=Terraform" alt="Terraform" />
          <img src="https://img.shields.io/badge/Ansible-E00?logo=ansible&logoColor=fff&style=plastic" alt="Ansible" />
          <img src="https://img.shields.io/badge/-Docker-2496ED?style=plastic&logoColor=white&logo=docker" alt="Docker" />
          <img src="https://img.shields.io/badge/Kubernetes-326ce5.svg?&style=plastic&logo=kubernetes&logoColor=white" alt="Kubernetes" />
          <img src="https://img.shields.io/badge/K3s-FFC61C?logo=k3s&logoColor=white&style=plastic" alt="K3s" />
          <img src="https://img.shields.io/badge/Helm-0F1689.svg?style=plastic&logo=Helm&logoColor=white" alt="Helm" />
          <img src="https://img.shields.io/badge/AWS-232F3E?logoColor=white&style=plastic&logo=amazonwebservices" alt="AWS" />
          <img src="https://img.shields.io/badge/GCP-4285F4.svg?style=plastic&logo=Google-Cloud&logoColor=white" alt="GCP" />
          <img src="https://img.shields.io/badge/Cloudflare-F38020.svg?style=plastic&logo=Cloudflare&logoColor=white" alt="Cloudflare" />
          <img src="https://img.shields.io/badge/Fargate-F90?logo=awsfargate&logoColor=fff&style=plastic" alt="Fargate" />
          <img src="https://img.shields.io/badge/Lambda-F90?logo=awslambda&logoColor=fff&style=plastic" alt="Lambda" />
          <img src="https://img.shields.io/badge/Modal-7FEE64?logo=modal&logoColor=fff&style=plastic" alt="Modal" />
          <img src="https://img.shields.io/badge/Grafana-F46800.svg?style=plastic&logo=Grafana&logoColor=white" alt="Grafana" />
          <img src="https://img.shields.io/badge/Prometheus-E6522C.svg?style=plastic&logo=Prometheus&logoColor=white" alt="Prometheus" />
          <img src="https://img.shields.io/badge/Nginx-009639.svg?style=plastic&logo=NGINX&logoColor=white" alt="Nginx" />
          <img src="https://img.shields.io/badge/Traefik-24A1C1?logo=traefikproxy&logoColor=fff&style=plastic" alt="Traefik" />
          <img src="https://img.shields.io/badge/Let's%20Encrypt%20ACME-003A70?logo=letsencrypt&logoColor=fff&style=plastic" alt="Let's Encrypt" />
          <img src="https://img.shields.io/badge/Namecheap-DE3723?logo=namecheap&logoColor=fff&style=plastic" alt="Namecheap" />
          <img src="https://img.shields.io/badge/Tailscale-242424?logo=tailscale&logoColor=fff&style=plastic" alt="Tailscale" />
          <img src="https://img.shields.io/badge/Ngrok-1F1E37?logo=ngrok&logoColor=fff&style=plastic" alt="Ngrok" />
          <img src="https://img.shields.io/badge/DVC-13ADC7.svg?style=plastic&logo=DVC&logoColor=white" alt="DVC" />
          <img src="https://img.shields.io/badge/Triton%20Inference%20Server-8fce00?style=plastic&logo=NVIDIA&logoColor=white" alt="NVIDIA Triton" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
