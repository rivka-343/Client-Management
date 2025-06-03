import { useState } from "react";
import LoginT from "./LoginT";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginState, setLoginState] = useState(false);

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: '1.6',
      color: '#333',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      direction: 'rtl'
    }}>

{showLogin && (
        <LoginT setLogin={setLoginState} prev={loginState} />
      )}
      <section style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '60px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            fontWeight: '700'
          }}>
            מערכת דיגיטלית מתקדמת
          </h2>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto 40px auto',
            lineHeight: '1.8'
          }}>
            פתרון מקצועי ויעיל לניהול בקשות הנחות ארנונה עבור תושבי חריש ועובדי העירייה
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>חישוב אוטומטי</h3>
              <p style={{ fontSize: '0.95rem', opacity: '0.9' }}>מערכת חישוב מדויקת ומהירה</p>
            </div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>עיבוד יעיל</h3>
              <p style={{ fontSize: '0.95rem', opacity: '0.9' }}>חיסכון בזמן ומאמץ</p>
            </div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>ממשק נוח</h3>
              <p style={{ fontSize: '0.95rem', opacity: '0.9' }}>חווית משתמש מתקדמת</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#ffffff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '60px'
          }}>
            {/* For Residents */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
                gap: '15px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px'
                }}>
                  👥
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#1e40af',
                  margin: '0',
                  fontWeight: '600'
                }}>
                  עבור התושבים
                </h3>
              </div>
              <p style={{
                fontSize: '1.1rem',
                marginBottom: '25px',
                color: '#555',
                lineHeight: '1.7'
              }}>
                המערכת מאפשרת לתושבים להגיש בקשות להנחות בארנונה בצורה דיגיטלית, 
                פשוטה ונוחה ללא צורך בהגעה פיזית לעירייה.
              </p>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0'
              }}>
                {[
                  'העלאת מסמכים דיגיטלית',
                  'חישוב אוטומטי של הארנונה',
                  'מעקב אחר סטטוס הבקשה',
                  'תהליך ברור ושקוף',
                  'חיסכון בזמן ומאמץ'
                ].map((item, index) => (
                  <li key={index} style={{
                    padding: '12px 0',
                    borderBottom: '1px solid #e5e7eb',
                    position: 'relative',
                    paddingRight: '30px',
                    fontSize: '1rem'
                  }}>
                    <span style={{
                      position: 'absolute',
                      right: '0',
                      color: '#10b981',
                      fontWeight: 'bold'
                    }}>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* For Municipality Staff */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
                gap: '15px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#7c3aed',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px'
                }}>
                  🏛️
                </div>
                <h3 style={{
                  fontSize: '1.8rem',
                  color: '#1e40af',
                  margin: '0',
                  fontWeight: '600'
                }}>
                  עבור עובדי העירייה
                </h3>
              </div>
              <p style={{
                fontSize: '1.1rem',
                marginBottom: '25px',
                color: '#555',
                lineHeight: '1.7'
              }}>
                כלי עבודה מתקדם המיועד לייעל את תהליך בדיקת ואישור בקשות ההנחות 
                באופן מקצועי ויעיל.
              </p>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0'
              }}>
                {[
                  'צפייה במסמכים דיגיטליים',
                  'בדיקה אוטומטית של חישובים',
                  'אפשרות לעדכון ידני',
                  'ניהול תור הבקשות',
                  'דיווחים ונתונים סטטיסטיים'
                ].map((item, index) => (
                  <li key={index} style={{
                    padding: '12px 0',
                    borderBottom: '1px solid #e5e7eb',
                    position: 'relative',
                    paddingRight: '30px',
                    fontSize: '1rem'
                  }}>
                    <span style={{
                      position: 'absolute',
                      right: '0',
                      color: '#10b981',
                      fontWeight: 'bold'
                    }}>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <h2 style={{
            fontSize: '2.2rem',
            textAlign: 'center',
            marginBottom: '50px',
            color: '#1e40af',
            fontWeight: '600'
          }}>
            תכונות המערכת
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {[
              {
                icon: '📄',
                title: 'העלאת מסמכים',
                description: 'העלאה פשוטה ומאובטחת של תלושי שכר, דוחות וחשבונות בנק'
              },
              {
                icon: '🔢',
                title: 'חישוב אוטומטי',
                description: 'חישוב מדויק ומהיר של גובה הארנונה על בסיס המסמכים'
              },
              {
                icon: '👀',
                title: 'בדיקה ואישור',
                description: 'כלים מתקדמים לעובדי העירייה לבדיקה ואישור בקשות'
              },
              {
                icon: '📊',
                title: 'ניהול נתונים',
                description: 'מעקב, דיווחים והיסטוריית שינויים מפורטת'
              },
              {
                icon: '🔒',
                title: 'אבטחת מידע',
                description: 'הגנה מתקדמת על מידע רגיש ונתוני התושבים'
              },
              {
                icon: '⚡',
                title: 'יעילות משופרת',
                description: 'צמצום זמני המתנה ושיפור משמעותי בתהליכי העבודה'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                border: '1px solid #e5e7eb',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '20px'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '15px',
                  color: '#1e40af',
                  fontWeight: '600'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#1e40af',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 20px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.2rem',
            marginBottom: '20px',
            fontWeight: '600'
          }}>
            כניסה למערכת
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '40px',
            opacity: '0.9',
            lineHeight: '1.7'
          }}>
            עובדי עיריית חריש מוזמנים להתחבר למערכת ולהתחיל לנהל בקשות בצורה יעילה ומקצועית
          </p>
          {/* <a 
            href="https://managingpropertytaxdiscountrequests.onrender.com/"
            style={{
              backgroundColor: 'white',
              color: '#1e40af',
              padding: '15px 40px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: '600',
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
                  const target = e.target as HTMLAnchorElement; // Cast to HTMLAnchorElement
              target.style.transform ='translateY(-2px)';
              target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLAnchorElement; // Cast to HTMLAnchorElement

              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }}
          >
            התחבר למערכת
          </a> */}
          <button
            onClick={() => setShowLogin(true)}
            style={{
              backgroundColor: 'white',
              color: '#1e40af',
              padding: '15px 40px',
              borderRadius: '8px',
              fontSize: '1.2rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }}
          >
            התחבר למערכת
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '40px 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <p style={{
            marginBottom: '10px',
            fontSize: '1rem'
          }}>
            &copy; 2025 עיריית חריש - כל הזכויות שמורות
          </p>
          <p style={{
            color: '#9ca3af',
            fontSize: '0.9rem'
          }}>
            מערכת פותחה במטרה לייעל ולשפר את השירות לתושבים
          </p>
        </div>
      </footer>
     
    </div>
    
  );
};

export default Home;