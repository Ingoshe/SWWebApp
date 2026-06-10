import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nf-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 80vh;
          background: #eaeaea;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 60px 24px;
        }
        .nf-code {
          font-family: 'Cormorant Garamond', serif;
          font-size: 120px;
          font-weight: 300;
          line-height: 1;
          color: #d0d0d0;
          margin: 0 0 8px;
        }
        .nf-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 400;
          color: #333;
          margin: 0 0 12px;
        }
        .nf-body {
          font-size: 14px;
          color: #888;
          max-width: 340px;
          line-height: 1.6;
          margin: 0 0 32px;
        }
        .nf-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #fff;
          background: #1a1814;
          border: none;
          border-radius: 20px;
          padding: 12px 28px;
          cursor: pointer;
          transition: background 0.18s, transform 0.15s;
        }
        .nf-btn:hover { background: #333; transform: translateY(-2px); }
      `}</style>

      <div className="nf-root">
        <div className="nf-code">404</div>
        <h1 className="nf-title">Page Not Found</h1>
        <p className="nf-body">
          The destination you are looking for does not exist or has been moved.
          Let us guide you back.
        </p>
        <button className="nf-btn" onClick={() => navigate("/")}>
          Return Home →
        </button>
      </div>
    </>
  );
}